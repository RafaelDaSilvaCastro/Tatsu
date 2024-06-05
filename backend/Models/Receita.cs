using backend.Enum.Receita;
using backend.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace backend.Models
{
    public class Receita
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("titulo")]
        public string? Titulo { get; set; }

        [BsonElement("Dificuldade")]
        public DificuldadeReceita Dificuldade { get; set; }

        [BsonElement("porcao")]
        public int PorcaoPessoas { get; set; }

        [BsonElement("ingredientes")]
        [JsonConverter(typeof(Conversor))]
        public Dictionary<string, Dictionary<string, string>> Ingredientes { get; set; }

        [BsonElement("preparo")]
        [JsonConverter(typeof(Conversor))]
        public Dictionary<string, Dictionary<string, string>> Preparo { get; set; }

        [BsonElement("observacao")]
        public string? Observacao { get; set; }

        }
  
    public class GerarReceita
    {
        public DificuldadeReceita Dificuldade { get; set; }

        public string PorcaoPessoas { get; set; }

        public List<string> Ingredientes { get; set; }

    }
}
