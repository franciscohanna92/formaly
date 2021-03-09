using System;
using System.Linq;
using System.Collections.Generic;
using MongoDB.Driver;

namespace backend.dal
{
  public class Repository<T> : IRepository<T> where T : BaseEntity
  {
    private readonly IMongoCollection<T> _collection;

    string errorMessage = string.Empty;
    public Repository()
    {
      var client = new MongoClient("mongodb://localhost:27017");
      var database = client.GetDatabase("formaly");

      Console.WriteLine(typeof(T).Name.ToLower());

      _collection = database.GetCollection<T>("forms");
    }
    
    public IEnumerable<T> Get() {
      Console.WriteLine("Repo.Get");

      return _collection.Find(doc => true).ToList();
    }

    public T Get(string id) =>
        _collection.Find<T>(doc => doc.id == id).FirstOrDefault();

    public T Create(T doc)
    {
      _collection.InsertOne(doc);
      return doc;
    }

    public void Update(string id, T docIn) =>
        _collection.ReplaceOne(doc => doc.id == id, docIn);

    public void Remove(T docIn) =>
        _collection.DeleteOne(doc => doc.id == docIn.id);

    public void Remove(string id) =>
        _collection.DeleteOne(doc => doc.id == id);
  }
}