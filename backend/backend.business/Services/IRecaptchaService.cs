using System;
using System.Threading.Tasks;

namespace backend.business
{
  public interface IRecaptchaService
  {
    Task<bool> IsCaptchaValid(string token);
  }
}
