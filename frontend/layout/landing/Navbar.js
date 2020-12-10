import Link from "next/link";
import { useState } from "react";
import Brand from "../../components/Brand";
import Icon from "../../components/Icon";
import NotificationIndicator from "../../components/NotificationIndicator";

function Navbar({ user }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="navbar fixed-top navbar-expand bg-white">
      <Link href="/">
        <a className="brand d-flex justify-content-center">
          <Brand />
        </a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul className="navbar-nav ml-auto">
        {!user ? (
          <>
            <li className="nav-item active mr-3">
              <Link href="/auth">
                <a className="btn px-3 btn-outline-primary font-weight-bold nav-link">
                  Sign in
                </a>
              </Link>
            </li>

            <li className="nav-item active">
              <Link href="/auth">
                <a className="btn font-weight-bold px-3 btn-primary nav-link">
                  Start for free
                </a>
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item active">
            <Link href="/account">
              <a className="btn font-weight-bold px-3 btn-outline-primary nav-link">
                My account
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
