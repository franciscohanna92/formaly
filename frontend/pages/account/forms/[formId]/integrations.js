import ViewFormLayout from "../../../../layout/account/ViewFormLayout"
import { format } from "timeago.js";
import Icon from "../../../../components/Icon";
import Link from "next/link";
import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router"

function FormSettings(props) {
  const router = useRouter()
  const { formId } = router.query

  const { data: form, update } = useDocument(`forms/${formId}`);

  return (
    <ViewFormLayout formName={form?.name}>
    </ViewFormLayout>
  )
}

export default FormSettings