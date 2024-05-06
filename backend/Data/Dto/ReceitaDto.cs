using backend.Enum.Receita;
using backend.Models;
using Newtonsoft.Json;

namespace backend.Data.Dto
{
    public class ReceitaDto
    {
        [JsonProperty("Titulo")]
        public string Titulo { get; set; }

        [JsonProperty("Dificuldade")]
        public DificuldadeReceita Dificuldade { get; set; }

        [JsonProperty("Porcao")]
        public int Porcao { get; set; }

        [JsonProperty("Ingredientes")]
        public Dictionary<string, string> Ingredientes { get; set; }

        [JsonProperty("Preparo")]
        public Dictionary<string, string> Preparo { get; set; }

    }

}
