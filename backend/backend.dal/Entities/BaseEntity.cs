using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.dal
{
  public class BaseEntity
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; }
  }
}