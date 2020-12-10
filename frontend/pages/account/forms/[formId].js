import { format } from "timeago.js";
import Icon from "../../../components/Icon";
import Link from "next/link";
import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import ViewFormLayout from "../../../layout/account/ViewFormLayout";

function ViewForm(props) {
  const router = useRouter();
  const { formId } = router.query;

  const { data: form } = useDocument(`forms/${formId}`);
  typeof window !== 'undefined' && router.replace(`${router.asPath}/inbox`)
  return (
    <ViewFormLayout title={form?.name}>
    </ViewFormLayout>
  );
}

export default ViewForm;
