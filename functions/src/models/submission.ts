import firebaseAdmin from "../lib/firebase-admin";

const submissionsCollection = firebaseAdmin
  .firestore()
  .collection("submissions");

async function create(submission: any) {
  await submissionsCollection.add(submission);
}

export default {
  create
};
