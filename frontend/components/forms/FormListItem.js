import Icon from "../Icon";
import { useState } from "react";
import { useRouter } from "next/router";

function FormListItem({ form, className }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => typeof window !== 'undefined' && router.push(`/account/forms/${form.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${
        hovered ? "text-dark" : "text-gray-600"
      } font-weight-light align-items-center px-4 py-4 d-flex justify-content-between cursor-pointer ${className}`}
    >
      <div style={{ flex: "2 0 0" }}>
        <h5 className="mb-0">{form.name}</h5>
        
      </div>
      <div style={{ flex: "1.5 0 0" }}>
        <p className="mb-0">{form.domain}</p>
      </div>
      <div style={{ flex: "1 0 0" }} className="d-flex px-5">
        <div>
          <img
            style={{
              width: "1.5rem",
              filter: !form.settings.email ? "grayscale(1)" : "",
              opacity: !form.settings.email ? ".25" : "",
            }}
            src="/img/gmail_logo.png"
            alt="Email forwarding enabled"
          />
        </div>
        <div className="mx-auto">
          <img
            style={{
              width: "1.5rem",
              filter: !form.settings.recaptcha ? "grayscale(1)" : "",
              opacity: !form.settings.recaptcha ? ".25" : "",
            }}
            src="/img/recaptcha_logo.png"
            alt=""
          />
        </div>
        <div>
          <img
            style={{
              width: "1.5rem",
              filter: !form.settings.webhook ? "grayscale(1)" : "",
              opacity: !form.settings.webhook ? ".25" : "",
            }}
            src="https://cdn.freebiesupply.com/logos/large/2x/webhooks-logo-png-transparent.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <Icon name="ARROW_RIGHT" transform="grow-4" className="mr-3" />
      </div>
    </div>
  );
}

export default FormListItem;
