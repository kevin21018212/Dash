import { notFound } from "next/navigation";
import prisma from "@/prisma/prisma";

const ProjectPage = async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: { project_id: parseInt(params.id, 10) },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          Project Link
        </a>
      )}
      {project.image_url && <img src={project.image_url} alt={project.title} />}
    </div>
  );
};

export default ProjectPage;
