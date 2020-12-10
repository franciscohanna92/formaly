import firebaseAdmin from "../lib/firebase-admin";
import { ERRORS } from "../middleware/errorHandler";

type FormSettings = {
  async: boolean,
  recaptcha: boolean,
  webhook: boolean,
  email: boolean
}

export type FormDocument = {
  userId: string;
  domain: string;
  redirect: string;
  recaptchaSecret: string;
  targetEmail: string;
  settings: FormSettings
};

const formsCollection = firebaseAdmin.firestore().collection("forms");

async function _getFormSnapshotById(formId: string) {
  const snapshot = (await formsCollection
    .doc(formId)
    .get()) as firebaseAdmin.firestore.DocumentSnapshot<FormDocument>;

  if (!snapshot.exists) {
    throw new Error(ERRORS.E100);
  }

  return snapshot;
}

async function getById(formId: string) {
  const snapshot = await _getFormSnapshotById(formId);
  return {
    ref: snapshot.ref,
    form: snapshot.data()
  };
}

export default {
  getById
};
