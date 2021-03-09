using System;
using System.Text.Json;
using System.Collections.Generic;
using backend.dal;
using System.Threading.Tasks;

namespace backend.business
{
  public interface IFormService
  {
    Task<SubmissionEntity> submitForm(string formId, string host, JsonElement content);
    IEnumerable<Form> getAllForms();
    Form getFormById(string id);
  }
}
