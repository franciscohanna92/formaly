namespace backend.dal
{
  public class FormSettings
  {
    public bool recaptcha { get; set; }
    public bool email { get; set; }
  }

  public class FormEntity : BaseEntity
  {
    public string title { get; set; }
    public string recaptchaSecret { get; set; }
    public string targetEmail { get; set; }
    public string domain { get; set; }
    public FormSettings settings  { get; set; }
  }
}