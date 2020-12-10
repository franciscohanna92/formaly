import { useCollection } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import SubmissionListItem from "./SubmissionListItem";

function SubmissionList({ formId }) {
  const router = useRouter()
  const firestoreQuery = {
    listen: true,
    orderBy: ["createdAt", "desc"]
  }

  if(formId) {
    firestoreQuery.where = [
      ['formId', '==', router.query.formId]
    ]
  }

  const { data: submissions, update, error } = useCollection("submissions", firestoreQuery);

  const sortedPayloadKeys = submissions && submissions[0] && Object.keys(submissions[0].payload).sort()

  return (
    <>
      {submissions && (
        <table className="table table-striped border-0">
          <thead>
            <tr>
              { !formId && <th>form</th>}
              <th className="pl-4">date</th>
              {sortedPayloadKeys?.map((key) => <th>{key}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
          {submissions.map((submission) => (
            <SubmissionListItem formId={formId} key={submission.id} submission={submission} />
          ))}
          </tbody>
        </table>
      )}
    </>
  );
}

SubmissionList.defaultProps = {
  formId: null
}

export default SubmissionList;
