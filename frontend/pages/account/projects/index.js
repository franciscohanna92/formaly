import Link from "next/link";
import { useCollection } from "@nandorojo/swr-firestore";
import AccountLayout from "../../../layout/account/AccountLayout";
import ProjectCard from "../../../components/projects/ProjectCard";

function Projects(props) {
  const { data: projects, error } = useCollection("projects", { listen: true });

  if (error) return <p>Error!</p>;

  return (
    <AccountLayout
      isLoading={!projects}
      title="Projects"
      // action={
      //   <Link href='/account/projects/create'>
      //     <a
      //       href="#"
      //       className="d-none d-sm-inline-block btn btn btn-primary shadow-sm"
      //     >
      //       Create project
      //     </a>
      //   </Link>
      // }
    >
      {projects?.length === 0 && (
        <div className="jumbotron py-5 rounded-0 bg-transparent">
          <h4>You have not created any projects yet (・_・;)</h4>
          <p className="mb-0">
            <span>Would you like to </span>
            <Link href="/account/projects/create">
              <a>create one</a>
            </Link>
            ?
          </p>
        </div>
      )}

      <div className="container mt-4">
        <div className="row">
          {projects?.length > 0 &&
            projects.map((project, index) => (
              <div className="col-4">
                <ProjectCard
                  // className={index % 2 !== 0 ? "bg-light" : ""}
                  project={project}
                />
              </div>
            ))}
        </div>
      </div>
    </AccountLayout>
  );
}

export default Projects;
