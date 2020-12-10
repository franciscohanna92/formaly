import { useEffect, useState } from "react";
import Link from "next/link";
// import ReactPlaceholder from "react-placeholder";
import { format } from "timeago.js";
import Icon from "../Icon";
// import NotificationIndicator from "../NotificationIndicator";

const KEY_BLOCKLIST = ["g-recaptcha-response"];

function SubmissionsListItem({ submission, formId }) {
  const [form, setForm] = useState();
  const sortedPayloadKeys =
    submission && Object.keys(submission.payload).sort();

  useEffect(() => {
    async function fetchForm() {
      const formSnapshot = await submission.form.get();
      setForm({
        id: formSnapshot.id,
        ...formSnapshot.data(),
      });
    }
    fetchForm();
    return;
  }, []);

  return (
    <tr key={submission.id}>
      {/* {!formId && (
        <td className="pl-3 align-baseline">
          {form && <Link href={`/account/forms/${form.id}`}>{form.name}</Link>}
        </td>
      )} */}
      <td className="text-dark pl-4 align-baseline">
        {format(submission.createdAt.toDate())}
      </td>
      {sortedPayloadKeys.map(key => (
        <td className="text-dark align-baseline pr-4">{submission.payload[key]}</td>
      ))}
      <td className="d-flex">
        <Link href={`/account/inbox/${submission.id}`}>
          <a
            title="View submission data"
            className="position-relative btn p-2 text-dark mr-4te"
          >
            <Icon name="ACTION_VIEW" />
          </a>
        </Link>
        {/* <Link href={`/account/forms/${submission.form.id}`}>
          <a title="Go to form" className="btn p-2 text-dark">
            <Icon name="FORM" />
          </a>
        </Link> */}
      </td>
    </tr>
  );
}

SubmissionsListItem.defaultProps = {
  formId: null,
};

export default SubmissionsListItem;
