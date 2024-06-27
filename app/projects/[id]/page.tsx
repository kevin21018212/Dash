"use client";

import React, { useEffect } from "react";
import { useSetAtom } from "jotai";

import ProjectContent from "@/components/project/projectContent";
import { projectAtom } from "@/app/utils/projectAtom";

const fetchProject = async (projectId) => {
  const response = await fetch(`/api/get/info?projectId=${projectId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const ProjectPage = ({ params }) => {
  const setProject = useSetAtom(projectAtom);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const projectData = await fetchProject(params.id);
        setProject(projectData.project);
        console.log("Project data fetched:", projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    getProjectData();
  }, [params.id, setProject]);

  return <ProjectContent />;
};

export default ProjectPage;
