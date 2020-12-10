import { CopyToClipboard } from "react-copy-to-clipboard";
import AccountLayout from "./AccountLayout";
import { useRouter } from "next/router";
import ActiveLink from "../../components/ActiveLink";
import { useRef, useState } from "react";
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

function CopyFormId({ formId }) {
  const [copied, setCopied] = useState(false);
  const target = useRef(null);

  function handleCopyId() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="d-flex flex-column">
      <CopyToClipboard text={formId} onCopy={handleCopyId}>
        <button ref={target} className="btn btn-lg border-0">
          <span className="mr-2">Form ID:</span>
          <code className="text-dark font-weight-bold mb-0 font-weight-normal py-1">
            {formId}
          </code>
        </button>
      </CopyToClipboard>
      <Overlay target={target.current} show={copied} placement="bottom">
        {(props) => (
          <Tooltip className="mt-1" {...props}>
            Copied to clipboard!
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

function ViewFormLayout({ formName, children }) {
  const router = useRouter();
  const { formId } = router.query;

  return (
    <AccountLayout
      divider={false}
      title={formName || ''}
      action={<CopyFormId formId={formId} />}
    >
      <div className="px-4">
        <ul class="nav">
          <li class="nav-item">
            <ActiveLink href={`/account/forms/${formId}/inbox`}>
              <a className="nav-link pl-0 pr-4 text-primary lead">
                Inbox
              </a>
            </ActiveLink>
          </li>
          <li class="nav-item">
            <ActiveLink href={`/account/forms/${formId}/settings`}>
              <a className="nav-link pl-0 pr-4 text-primary lead">Settings</a>
            </ActiveLink>
          </li>
          {/* <li class="nav-item">
            <ActiveLink href={`/account/forms/${formId}/integrations`}>
              <a className="nav-link pl-0 pr-4 text-primary lead">Integrations</a>
            </ActiveLink>
          </li> */}
        </ul>
        <hr />
      </div>
      {children}
    </AccountLayout>
  );
}

export default ViewFormLayout;
