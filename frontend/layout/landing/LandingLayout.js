import Link from "next/link";
import { string, shape } from "prop-types";
import Navbar from "./Navbar";

function LandingLayout({ user, children }) {
  return (
    <>
      <Navbar user={user} />
      <main role="main">{children}</main>
    </>
  );
}

LandingLayout.propTypes = {
  title: string.isRequired,
  action: shape({
    text: string,
    url: string,
  }),
};

export default LandingLayout;
