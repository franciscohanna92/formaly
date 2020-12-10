import Link from "next/link";
import { string, shape, bool } from "prop-types";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AccountLayout({
  children,
  title,
  description,
  action,
  isLoading,
  divider,
}) {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <Topbar />
        <div id="content">
          <div className="container">
            <div className="card border-0 shadow-sm">
              <div className="card-header px-4 pt-4 bg-white border-0 d-flex justify-content-between">
                <header>
                  <h1 className="h2 mb-0 text-dark font-weight-bold">
                    {title}
                  </h1>
                  <p className="text-gray-30 mb-0">{description}</p>
                </header>
                {action}
              </div>

              {divider && <hr />}

              <div className="card-body px-0 pt-0">
                {isLoading ? <p>Loading...</p> : children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountLayout.propTypes = {
  title: string.isRequired,
  divider: bool,
  action: shape({
    text: string,
    url: string,
  }),
};

AccountLayout.defaultProps = {
  divider: true
}

export default AccountLayout;
