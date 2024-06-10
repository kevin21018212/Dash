"use client";
import { useQuery } from "@tanstack/react-query";
import ProjectContent from "@/app/components/project/projectContent";

const fetchProject = async (projectId: string) => {
  const response = await fetch(`/api/get/info?projectId=${projectId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data); // Log the fetched project data
  return data;
};

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const {
    data: project,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => fetchProject(params.id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading project data</div>;

  return <ProjectContent project={project.project} refetchProject={refetch} />;
};

export default ProjectPage;
