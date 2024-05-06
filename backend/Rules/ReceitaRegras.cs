using AutoMapper;
using backend.Data.Dto;
using backend.Data.Repositories;
using backend.Models;
using backend.Services;
using backend.Utils;
using Newtonsoft.Json;

namespace backend.Rules
{
    public class ReceitaRegras
    {
        private readonly ReceitaRepositoy _receitaRepositoy;
        private readonly IMapper _mapper;
        public ReceitaRegras(ReceitaRepositoy receitaRepositoy, IMapper mapper)
        {
            _receitaRepositoy = receitaRepositoy;
            _mapper = mapper;
        }

        private string pergunta = "Olá, preciso que você me indique uma receita, tendo a seguinte estrutura:" +
                                    "\n Título: NomeDaReceita " +
                                    "\n Dificuldade: {0}" +
                                    "\n Porção: {1} " +
                                    //"a sua resposta deve conter apenas o título da receita e os ingredientes, de forma que estejam listados abaixo do titulo." +
                                    "\nIngredientes: Deve ser em formato de dicionario";
        
        public async Task<Response<string>> GerarReceita(GerarReceita gerarReceita)
        {

            var texto = FormularPergunta(pergunta, gerarReceita);
            
            //Gerando resposta pelo Gemini.
            var response = await GeminiService.Generate(texto);

            if (!response.Success)
            {
                return response;
            }

            ReceitaDto receitaDto;

            try
            {
                //Retirando acentuaçao do Json.
                response.Text = StringUtils.FormatarString(response.Text);

                //Deserializando Json receitaDTo
                receitaDto = JsonConvert.DeserializeObject<ReceitaDto>(response.Text);
            }
            catch(Exception e)
            {
                return new Response<string> { Success = false, ErrorMessage = "Erro interno - deserializar DTo: " + e.Message } ;
            }
            
            //Mapeando para receita
            var receita = _mapper.Map<Receita>(receitaDto);

            //Criando receita.
         
            return await _receitaRepositoy.CreateAsync(receita);

        }

        public async Task<Response<List<Receita>>> Receitas()
        {
            return await _receitaRepositoy.GetAsync();
        }

        private string FormularPergunta(string text, GerarReceita gerarReceita)
        {
            //Formatando pergunta
            pergunta = string.Format(pergunta, gerarReceita.Dificuldade, gerarReceita.PorcaoPessoas);

            var texto = new System.Text.StringBuilder();
            texto.Append(pergunta);

            //Adicionando ingredientes a pergunta
            foreach (var ingrediente in gerarReceita.Ingredientes)
            {
                texto.Append(ingrediente + ",");
            }

            texto.Append("\nPreparo: Este deve ser criado como um novo objeto, contendo uma lista com o passo a passo; \nObservação: Me retornar os dados em um formato Json");

            return texto.ToString();
        
        }
    }
}
