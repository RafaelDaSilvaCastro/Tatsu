using backend.Enum.Receita;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Receita
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("titulo")]
        public string? Titulo { get; set; }

        [BsonElement("dificuldade")]
        public DificuldadeReceita Dificuldade { get; set; }

        [BsonElement("porcao_pessoas")]
        public string? PorcaoPessoas { get; set; }
        [BsonElement("ingredientes")]
        public Dictionary<string, string> Ingredientes { get; set; }

        [BsonElement("Preparo")]
        public Dictionary<string, string> Preparo { get; set; }
    }

    public class GerarReceita
    {
        public DificuldadeReceita Dificuldade { get; set; }

        public string? PorcaoPessoas { get; set; }

        public List<string> Ingredientes { get; set; }

    }
}
