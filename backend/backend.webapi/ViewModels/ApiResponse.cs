using System;
using System.Collections.Generic;

namespace backend.webapi
{
  public class ApiResponse<T>
  {
    public bool success { get; set; }
  }

  public class ApiResponseList<T> : ApiResponse<T>
  {
    public IEnumerable<T> payload { get; set; }
  }

  public class ApiResponseSingle<T> : ApiResponse<T>
  {
    public T payload { get; set; }
  }
}