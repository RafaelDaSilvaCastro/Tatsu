using AutoMapper;
using backend.Data.Dto;
using backend.Data.Repositories;
using backend.Enum.Receita;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using backend.Utils;
using Google.Cloud.AIPlatform.V1;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static Google.Rpc.Context.AttributeContext.Types;

namespace backend.Rules
{
    public class ReceitaRegras : Conversor
    {

        public ReceitaRegras(ReceitaRepositoy receitaRepositoy, IMapper mapper)
        {
            _receitaRepositoy = receitaRepositoy;
            _mapper = mapper;
        }

        string validarJson = "O modo de preparo deve estar em formato de dicionario e em 1 único dicionario, separados por passo 1, passo 2... E a observação deve ser descrita acima da receita..\n";

        string estruturaJson = @"{
            ""Titulo"": ""Salada de Arroz"",
            ""Dificuldade"": ""Fácil"",
            ""Porcao"": 4,
            ""Ingredientes"": {
                ""Salada"": {
                    ""Alface"": ""1 maço"",
                    ""Tomate"": ""2 unidades"",
                    ""Pepino"": ""1 unidade"",
                    ""Cebola"": ""1/2 unidade""
                },
                ""Arroz"": {
                    ""Arroz branco cozido"": ""2 xícaras"",
                    ""Milho verde"": ""1 lata"",
                    ""Ervilha"": ""1 lata"",
                    ""Azeitonas verdes picadas"": ""1/2 xícara"",
                    ""Azeite de oliva"": ""2 colheres de sopa"",
                    ""Sal"": ""a gosto""
                }
            },
            ""Preparo"": {
                ""Passo 1"": ""Lave e pique a alface, o tomate, o pepino e a cebola."",
                ""Passo 2"": ""Em uma tigela grande, misture a salada com o arroz cozido, o milho verde, a ervilha e as azeitonas."",
                ""Passo 3"": ""Tempere com azeite de oliva e sal a gosto."",
                ""Passo 4"": ""Sirva em seguida.""
            }
        }";

        private readonly ReceitaRepositoy _receitaRepositoy;
        private readonly IMapper _mapper;

        public async Task<Response<string>> GerarReceita(GerarReceita gerarReceita)
        {

            var validar = ValidacaoGeral(gerarReceita.Dificuldade, gerarReceita.PorcaoPessoas, ValidarReceita.GerarReceita, gerarReceita.Ingredientes);

            if (!validar.Success) return validar;

            //Formula a pergunta
            var pergunta = FormularPergunta(gerarReceita);

            //Obtém resposta do Gemini
            var response = await GeminiService.Generate(pergunta);

            //Valida o retorno
            response = await ValidarRetornoGemini(response, pergunta);

            ReceitaDto receitaDto;

            try
            {
                //Deserializando Json receitaDTo
                receitaDto = JsonConvert.DeserializeObject<ReceitaDto>(response.Text);
            }
            catch (Exception e)
            {
                return new Response<string> { Success = false, ErrorMessage = "Erro interno - desserializar DTo: " + e.Message };
            }

            //Mapeando para receita
            var receita = _mapper.Map<Receita>(receitaDto);

            //Criando receita.
            return await _receitaRepositoy.CreateAsync(receita);
        }

        public async Task<Response<List<Receita>>> TodasReceitas()
        {
            return await _receitaRepositoy.GetAsync();
        }

        public async Task<Response<string>> AtualizarReceita(string id, ReceitaDto receitaDto) {

            var validar = ValidacaoGeral(receitaDto.Dificuldade, receitaDto.Porcao, ValidarReceita.AtualizarReceita);

            if (!validar.Success) return validar;

            var receita = await _receitaRepositoy.GetAsync(id);

            try
            {
                if (!receita.Success) return new Response<string> { Success = false, ErrorMessage = receita.ErrorMessage};

                var novaReceita = _mapper.Map(receitaDto, receita.Data);

                return await _receitaRepositoy.UpdateAsync(id, novaReceita);
            }
            catch(Exception ex)
            {
                return new Response<string> { Success = false, ErrorMessage = "Erro ao atualizar receita" + ex.Message };
            }
        }

        public async Task<Response<string>> RemoveAsync(string id)
        {
            return await _receitaRepositoy.RemoveAsync(id);
        }

        public async Task<Response<Receita>> Receita(string id)
        {
            return await _receitaRepositoy.GetAsync(id);
        }

        private string FormularPergunta(GerarReceita receita)
        {
            string pergunta = @"Olá, preciso que você me indique uma receita, tendo a seguinte estrutura:" +
            "\n" + estruturaJson;

            var texto = new System.Text.StringBuilder();
            texto.Append(pergunta);

            //Adicionando ingredientes a pergunta
            foreach (var ingrediente in receita.Ingredientes)
            {
                texto.Append("\n A receita deve conter: " + ingrediente);
            }

            texto.Append("\n A receita deve servir " + receita.PorcaoPessoas + " pessoa(s) e dificuldade " + receita.Dificuldade);

            return texto.ToString();
        }

        private Response<string> ValidacaoGeral(DificuldadeReceita dificuldade, string porcao, ValidarReceita status, List<string> ingredientes = null)
        {
            var message = string.Empty;
            var sucess = true;

            if (!System.Enum.IsDefined(typeof(DificuldadeReceita), dificuldade))
            {
                message = ("Dificuldade informada é inválida.");
                sucess = false;
            }
            else if (!int.TryParse(porcao, out _))
            {
                message = ("A porção deve ser um número.");
                sucess = false;
            }

            switch (status) {

                case ValidarReceita.GerarReceita:
                    if (ingredientes == null || ingredientes.Count == 0) {
                        message = ("Nenhum ingrediente informado");
                        sucess = false;
                    }
                    break;
            }

            return new Response<string> { Success = sucess, ErrorMessage = message }; 
    }

        private async Task<Response<string>> ValidarRetornoGemini(Response<string> response, string pergunta)
        {
            var validado = false;

            //Formata a resposta.
            var resposta = StringUtils.FormatarString(response.Text);

            while (string.IsNullOrEmpty(resposta) || validado == false )
            {

                response = await GeminiService.Generate(pergunta);
                resposta = StringUtils.FormatarString(response.Text);

                //Retorna em caso de falha com o gemini
                if (!response.Success) return response;

                if (!string.IsNullOrEmpty(resposta))
                {
                    //Valida o Json.
                    validado = ValidarEstrutura(resposta);

                    if (!validado)
                    {
                        var retorno = await GeminiService.Generate(validarJson + resposta);
                        resposta =  StringUtils.FormatarString(retorno.Text);
                        validado = ValidarEstrutura(resposta);
                    }
                    
                    response.Text = resposta;

                }                
            }

            response.Text = StringUtils.FormatarString(response.Text);

            return response;
        }

        private bool ValidarEstrutura(string jsonString)
        {
            try
            {
                // Parse JSON
                JObject jsonObject = JObject.Parse(jsonString);

                // Verifica se a primeira chave é "Titulo"
                string firstKey = jsonObject.Properties().First().Name;
                return firstKey.Equals("Titulo", StringComparison.OrdinalIgnoreCase);
            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}
