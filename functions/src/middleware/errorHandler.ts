import { Request, Response, NextFunction } from "express";
import { logger } from "firebase-functions";

type Error = {
  statusCode: number;
  message: string;
};

type ErrorMap = {
  [key: string]: Error;
};

export enum ERRORS {
  E100 = "E100",
  E110 = "E110",
  E120 = "E120",
  E130 = "E130",
}

const ErrorMap: ErrorMap = {
  E100: {
    statusCode: 400,
    message: "Invalid form ID"
  },
  E110: {
    statusCode: 401,
    message: "Origin not allowed"
  },
  E120: {
    statusCode: 400,
    message: "Recaptcha challenge failed"
  },
  E130: {
    statusCode: 500,
    message: "Error forwarding email"
  }
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { form } = res.locals
  const errorCode = err.message;
  const ERROR = ErrorMap[errorCode];

  logger.error('Error while submitting form', ERROR || {
    message: err.message,
    statusCode: 500
  })

  if (!ERROR) {
    res.status(500).send({
      success: false,
      message: err.message,
      statusCode: 500
    });
    return;
  }

  res.status(ERROR.statusCode).send({
    success: false,
    message: ERROR.message,
    statusCode: ERROR.statusCode
  });
};

export default errorHandler;
