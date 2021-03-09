using System;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using backend.dal;
using backend.business;

namespace backend.root
{
  public class CompositionRoot
  {
    public CompositionRoot() { }

    public static void injectDependencies(IServiceCollection services)
    {
      services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
      // services.AddScoped<IAuthorRepository, AuthorRepository>();
      // services.AddScoped<IAuthorService, AuthorService>();
      // services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped<IFormService, FormService>();
    }
  }
}
