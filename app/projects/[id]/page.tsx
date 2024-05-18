import { redirect, notFound } from "next/navigation";
import prisma from "@/prisma/prisma";

import { getSession } from "next-auth/react";
import ProjectContent from "@/app/components/content/projectContent";

const ProjectPage = async ({ params }) => {
  const project = await prisma.project.findUnique({
    where: { project_id: parseInt(params.id, 10) },
  });

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
};

export default ProjectPage;
