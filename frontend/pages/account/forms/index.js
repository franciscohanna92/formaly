import Link from "next/link";
import { useCollection } from "@nandorojo/swr-firestore";
import AccountLayout from "../../../layout/account/AccountLayout";
import FormListItem from "../../../components/forms/FormListItem";

function Forms(props) {
  const { data: forms, error, isLoading } = useCollection("forms", { listen: true });

  if (error) return <p>Error!</p>;

  return (
    <AccountLayout
      isLoading={!forms}
      title="Forms"
      action={
        <Link href='/account/forms/create'>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn btn-primary shadow-sm"
          >
            Create form
          </a>
        </Link>
      }
    >
      {forms?.length === 0 && !isLoading && (
        <div className="jumbotron py-5 rounded-0 bg-transparent">
          <h4>You have not created any forms yet (・_・;)</h4>
          <p className="mb-0">
            <span>Would you like to </span>
            <Link href="/account/forms/create">
              <a>create one</a>
            </Link>
            ?
          </p>
        </div>
      )}

      <div>
        {forms?.length > 0 &&
          forms.map((form, index) => (
            <div>
              <FormListItem
                className={index % 2 !== 0 ? "bg-light" : ""}
                form={form}
              />
            </div>
          ))}
      </div>
    </AccountLayout>
  );
}

export default Forms;
