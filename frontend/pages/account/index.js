import { useState } from "react";
import { useCollection } from "@nandorojo/swr-firestore";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Icon from "../../components/Icon";
import AccountLayout from "../../layout/account/AccountLayout";
import { useUser } from "../../utils/auth/useUser";
import StatCard from "../../components/StatCard";

function Account() {
  const { user } = useUser();
  const { data: forms } = useCollection("forms", { listen: true });
  const { data: submissions } = useCollection("submissions", { listen: true });

  const [copied, setCopied] = useState();

  const onCopyFormid = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <AccountLayout divider={false} title="Dashboard">
      <section className="px-4 mt-4">
        <div className="row">
          <div className="col-12 col-lg-4 mb-4">
            <StatCard title="Your plan" value="Starter" icon="USER" />
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <StatCard title="Forms" value={forms?.length} icon="FORM" />
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <StatCard title="Inbox" value={submissions?.length} icon="INBOX" />
          </div>
        </div>
      </section>
    </AccountLayout>
  );
}

export default Account;
