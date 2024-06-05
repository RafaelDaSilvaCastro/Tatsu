using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using backend.Utils;
using Newtonsoft.Json;

namespace backend.Models
{
    public class IngredienteReceita
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("ingredientes")]
        [JsonConverter(typeof(Conversor))]
        public Dictionary<string, Dictionary<string, string>> Ingredientes { get; set; }
    }
}
