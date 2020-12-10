import ViewFormLayout from "../../../../layout/account/ViewFormLayout"
import { format } from "timeago.js";
import Icon from "../../../../components/Icon";
import Link from "next/link";
import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router"
import FormSettingsForm from "../../../../components/forms/FormSettingsForm";

function FormSettings(props) {
  const router = useRouter()
  const { formId } = router.query
  const { data: form } = useDocument(`forms/${formId}`);

  return (
    <ViewFormLayout formName={form?.name}>
      <div className='px-4 mt-3'>
        <FormSettingsForm formId={formId} />
      </div>

    </ViewFormLayout>
  )
}

export default FormSettings