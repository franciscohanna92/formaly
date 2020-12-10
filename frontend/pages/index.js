import Link from "next/link";
import LandingLayout from "../layout/landing/LandingLayout";
import { useUser } from "../utils/auth/useUser";

const Index = () => {
  const { user, logout } = useUser();

  return (
    <LandingLayout user={user}>
      <section
        style={{
          height: "100vh",
        }}
      >
        <div className="container d-flex h-100">
          <div className="row w-100 my-auto">
            <div className="col-12 col-lg-8 col-xl-6 px-4">
              <div className="d-flex flex-column justify-content-sm-center h-100">
                <h1 className="display-4 text-dark font-weight-bold mb-4">
                  Manage your forms without hassle
                </h1>
                <p className="h3 text-dark font-weight-light">
                  Let your users submit forms without deploying your own backend
                  service
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-6">
              <img src="/img/undraw.svg" className="img-fluid" alt="as" />
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );

  // return (
  //   <div>
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link href="/app/submissions">
  //             <a>Submissions</a>
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href="/app/forms">
  //             <a>Forms</a>
  //           </Link>
  //         </li>
  //       </ul>
  //     </nav>
  //     <p>You're signed in. Email: {user.email}</p>
  //     <p>
  //       Your API KEY is: <code>3IryiXiPsUextEAWln4CSgz8JSU2</code>
  //     </p>
  //     <p
  //       style={{
  //         display: "inline-block",
  //         color: "blue",
  //         textDecoration: "underline",
  //         cursor: "pointer",
  //       }}
  //       onClick={() => logout()}
  //     >
  //       Log out
  //     </p>
  //   </div>
  // );
};

export default Index;
