import Link from "next/link";
import { useState } from "react";
import Brand from "../../components/Brand";
import Icon from "../../components/Icon";
import NotificationIndicator from "../../components/NotificationIndicator";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link href="/account">
        <a className="brand d-flex justify-content-center">
          <Brand inverse />
        </a>
      </Link>

      {/* <hr className="sidebar-divider my-0" /> */}

      <li className="nav-item">
        <Link href="/account">
          <a className="nav-link text-white">
            <Icon className="m-sm-auto mr-md-3" name="DASHBOARD" />
            <span>Dashboard</span>
          </a>
        </Link>
      </li>

      {/* <hr className="sidebar-divider" /> */}

      {/* <li className="nav-item">
        <Link href="/account/projects">
          <a className="nav-link">
            <Icon className="m-sm-auto mr-md-3" name="PROJECT" />
            <span>Projects</span>
          </a>
        </Link>
      </li> */}

      <li className="nav-item">
        <Link href="/account/forms">
          <a className="nav-link text-white">
            <Icon className="m-sm-auto mr-md-3" name="FORM" />
            <span>Forms</span>
          </a>
        </Link>
      </li>

      {/* <hr className="sidebar-divider" /> */}

      {/* <li className="nav-item">
        <Link href="/account/profile">
          <a className="nav-link">
            <Icon className="m-sm-auto mr-md-3" name="USER" />
            <span>Account</span>
          </a>
        </Link>
      </li> */}

    </ul>
  );
}

export default Sidebar;
