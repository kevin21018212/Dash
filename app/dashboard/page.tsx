"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/cards/TaskCard";
import ProjectCard from "../components/cards/projectCard";
import FeatureContent from "../components/content/featureContent";
import { Feature, Project, Task } from "@prisma/client";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [session, setSession] = useState(null); // Placeholder for session management

  const fetchProjects = async () => {
    if (session) {
      const response = await fetch("/api/get/project");
      const data = await response.json();
      setProjects(data.projects);
    }
  };

  const fetchProjectDetails = async (projectId: number) => {
    const response = await fetch(`/api/get/project/${projectId}`);
    const data = await response.json();
    setTasks((prevTasks: Task[]) => [
      ...prevTasks,
      ...data.features.flatMap((feature: { tasks: any }) => feature.tasks),
    ]);
    setFeatures((prevFeatures: Feature[]) => [
      ...prevFeatures,
      ...data.features,
    ]);
  };

  useEffect(() => {
    fetchProjects();
  }, [session]);

  useEffect(() => {
    projects.forEach((project: Project) => {
      fetchProjectDetails(project.project_id);
    });
  }, [projects]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <div className="project-section">
          <h2>Projects</h2>
          <div className="project-list">
            {projects.map((project, index: number) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
        <div className="task-section">
          <h2>Tasks</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ))}
          </div>
        </div>
        <div className="feature-section">
          <h2>Features</h2>
          <div className="feature-list">
            {features.map((feature) => (
              <FeatureContent key={feature.feature_id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
