import ViewFormLayout from "../../../../layout/account/ViewFormLayout"

import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router"
import SubmissionList from "../../../../components/submissions/SubmissionList";

function FormSubmissions(props) {
  const router = useRouter()
  const { formId } = router.query
  const { data: form } = useDocument(`forms/${formId}`);
  const { data: submissions, update, error } = useCollection("submissions", {
    listen: true,
    orderBy: ['createdAt', 'desc'],
    where: [
      ['formId', '==', 'KS5t2FxCR0G8cC0OEmAv']
    ]
  });

  console.log(submissions)

  
  return (
    <ViewFormLayout formName={form?.name}>
      {
        submissions &&
        <SubmissionList formId={formId} submissions={submissions} />
      }
    </ViewFormLayout>
  )
}

export default FormSubmissions