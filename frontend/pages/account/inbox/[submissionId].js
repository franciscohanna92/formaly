import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDocument } from "@nandorojo/swr-firestore";
import { format } from "timeago.js";
import ReactPlaceholder from "react-placeholder";
import AccountLayout from "../../../layout/account/AccountLayout";

function ViewSubmission(props) {
  const router = useRouter();
  const submissionId = router.query.submissionId;
  const [form, setForm] = useState();

  const { data: submission, update } = useDocument(`submissions/${submissionId}`);

  useEffect(() => {
    if(submission && !submission.opened) {
      update({ opened: true })
    }
  }, [])

  useEffect(() => {
    if (submission) {
      async function fetchForm() {
        const formSnapshot = await submission.form.get();
        setForm({
          id: formSnapshot.id,
          ...formSnapshot.data(),
        });
      }
      fetchForm();
    }
    return;
  }, [submission]);

  return (
    <AccountLayout title="Submission">
      {submission && (
        <div
          key={submission.id}
          className="bg-white border p-3 justify-content-between align-items-center"
        >
          <div>
            <div className="align-items-center d-flex mb-2">
              <span className="badge badge-pill badge-dark mr-2">
                {submission.origin}
              </span>
              <span>{format(submission.createdAt.toDate())}</span>
            </div>
            <ReactPlaceholder
              className="rounded"
              style={{ height: 24 }}
              showLoadingAnimation
              type="rect"
              rows={1}
              ready={form}
            >
              <h5 className="mb-0">{form?.name}</h5>
            </ReactPlaceholder>
            <hr />
            <ul className="list-unstyled mb-0">
              {Object.entries(submission.payload).sort((a,b) => a[1]-b[1]).map(([name, value]) => (
                <li key={`${name}.${value}`}>
                  <strong>{name}: </strong> 
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}

export default ViewSubmission;
