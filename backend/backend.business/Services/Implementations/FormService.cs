using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using backend.dal;

namespace backend.business
{
  public class FormService : IFormService
  {
    IRepository<FormEntity> _formsRepository;

    public FormService(IRepository<FormEntity> formsRepository)
    {
      _formsRepository = formsRepository;
    }

    async public Task<SubmissionEntity> submitForm(string formId, string host, JsonElement content)
    {
      FormEntity form = _formsRepository.Get(formId);

      // Check request host domain
      
      // Check recaptcha// TODO: Inject RecaptchaService as dependency
      var recaptchaService = new RecaptchaService(form.recaptchaSecret);
      var recaptchaToken = content.GetProperty("g-recaptcha-response").GetString();
      var isCaptchaValid = await recaptchaService.IsCaptchaValid(recaptchaToken);

      if(!isCaptchaValid) {
        throw new Exception("Recaptcha validation failed");
      }

      // Send email

      // Save submission
      return null;
    }

    public IEnumerable<Form> getAllForms()
    {
      IEnumerable<FormEntity> formEntities = _formsRepository.Get();

      return formEntities.Select(formEntity => new Form
      {
        id = formEntity.id,
        title = formEntity.title
      });
    }

    public Form getFormById(string id)
    {
      FormEntity formEntity = _formsRepository.Get(id);

      return new Form
      {
        id = formEntity.id,
        title = formEntity.title
      };
    }
  }
}
