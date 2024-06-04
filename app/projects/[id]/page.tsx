import prisma from '@/prisma/prisma';

import ProjectContent from '@/app/components/project/projectContent';

const ProjectPage = async ({params}) => {
  const project = await prisma.project.findUnique({
    where: {project_id: parseInt(params.id, 10)},
    include: {
      features: {
        include: {
          tasks: true,
        },
      },
    },
  });

  return <ProjectContent project={project} />;
};

export default ProjectPage;
