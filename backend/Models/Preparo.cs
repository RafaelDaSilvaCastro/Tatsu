using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Collections.ObjectModel;

namespace backend.Models
{
    public class Preparo
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string? Id { get; set; }
        //[BsonElement("passo")]
        //public Dictionary<string,string> Passo{ get; set; }
        //
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string ReceitaId { get; set; }
        //
        //// Referência à Receita associada
        //[BsonIgnore]
        //public virtual ICollection<Receita> Receitas{ get; set; }

        [BsonElement("descricao")]
        public string Descricao { get; set; }
    }
}
