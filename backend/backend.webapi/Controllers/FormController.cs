using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
// using Newtonsoft.Json;

using backend.business;

namespace backend.webapi.Controllers
{
  public class TestDTO
  {
    public string test { get; set; }
  }

  [ApiController]
  [Route("forms")]
  public class FormController : ControllerBase
  {
    private readonly ILogger<FormController> _logger;
    private readonly IFormService _formService;

    public FormController(ILogger<FormController> logger, IFormService formService)
    {
      _logger = logger;
      _formService = formService;
    }

    [HttpGet]
    public ApiResponseList<Form> Get()
    {
      IEnumerable<Form> forms = _formService.getAllForms();
      return new ApiResponseList<Form>
      {
        success = true,
        payload = forms.ToArray()
      };
    }

    [HttpGet]
    [Route("{formId}")]
    public ApiResponseSingle<Form> Get(string formId)
    {
      Form form = _formService.getFormById(formId);
      return new ApiResponseSingle<Form>
      {
        success = true,
        payload = form
      };
    }

    [HttpPost]
    [Route("{formId}/submit")]
    public string Post(string formId, [FromBody] JsonElement formData)
    {
      Request.Headers.TryGetValue("Host", out var host);
      var form = _formService.submitForm(formId, host, formData);
      return "hola";
    }
  }
}
