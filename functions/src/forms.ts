import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import axios from "axios";
import Submissions from "./models/submission";
import Form from "./models/form";
import sendgridService from "./lib/sendgrid";
import errorHandler, { ERRORS } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send({
    name: "Formaly Submit API",
    version: "0.0.0"
  });
});

app.post("/:formId", async (req, res, next) => {
  try {
    const { formId } = req.params;
    const { form, ref } = await Form.getById(formId);

    res.locals.form = form;

    functions.logger.info("Form config", form);
    functions.logger.info("Payload submitted", req.body);

    // Check request origin
    const origin = new URL(req.headers["origin"] as string).hostname;
    functions.logger.info("Origin making the request", origin);
    if (!origin.includes(form?.domain as string)) {
      throw new Error(ERRORS.E110);
    }

    // Check recaptcha
    if (form?.settings.recaptcha && form.recaptchaSecret) {
      const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${form?.recaptchaSecret}&response=${req.body["g-recaptcha-response"]}`
      );
      if (!data.success) {
        throw new Error(ERRORS.E120);
      }
      delete req.body["g-recaptcha-response"];
    }

    // Send email
    if (form?.settings.email && form.targetEmail) {
      try {
        const subject = `New form submission @ ${origin}`;
        const response = await sendgridService.sendEmail(
          form.targetEmail,
          subject,
          req.body
        );
        console.log(response);
      } catch (error) {
        throw new Error(ERRORS.E130);
      }
    }

    await Submissions.create({
      payload: req.body,
      form: ref,
      formId: formId,
      origin: req.hostname,
      createdAt: new Date(),
      opened: false,
      userId: form?.userId
    });

    // if (req.header("Content-Type") === "application/json") {
    res.status(201).send({
      success: true,
      message: "Form submitted",
      statusCode: 201
    });
    // } else {
    //   res.redirect(form?.redirect as string);
    // }
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

// Expose Express API as a single Cloud Function:
export default functions.https.onRequest(app);
