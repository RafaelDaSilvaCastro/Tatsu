using backend.Enum.Receita;
using backend.Models;
using backend.Utils;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
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
        public string Porcao { get; set; }
        
        [JsonProperty("Ingredientes")]
        [JsonConverter(typeof(Conversor))]
        public Dictionary<string, Dictionary<string, string>> Ingredientes { get; set; }
        
        [JsonProperty("Preparo")]
        [JsonConverter(typeof(Conversor))]
        //public Dictionary<string,string> Preparo { get; set; }
        public Dictionary<string, Dictionary<string, string>> Preparo { get; set; }

    }

}
