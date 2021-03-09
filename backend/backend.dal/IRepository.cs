using System;
using System.Collections.Generic;

namespace backend.dal
{
  public interface IRepository<T> where T : BaseEntity
  {
    IEnumerable<T> Get();
    T Get(string id);
    T Create(T form);
    void Update(string id, T formIn);
    void Remove(string id);
  }
}