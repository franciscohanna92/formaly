using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace backend.business
{
  public class RecaptchaVerificationResponse
  {
    public bool success { get; set; }
  }

  public class RecaptchaService : IRecaptchaService
  {
    private readonly string _recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
    private readonly string _clientSecret;

    public RecaptchaService(string clientSecret)
    {
      _clientSecret = clientSecret;
    }

    public async Task<bool> IsCaptchaValid(string token)
    {
      var result = false;

      using var client = new HttpClient();

      var response = await client.PostAsync($"{_recaptchaUrl}?secret={_clientSecret}&response={token}", null);
      var jsonString = await response.Content.ReadAsStringAsync();
      var captchaVerfication = JsonConvert.DeserializeObject<RecaptchaVerificationResponse>(jsonString);

      result = captchaVerfication.success;

      return result;
    }
  }
}
