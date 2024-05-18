"use client";
import React, { useState } from "react";
import styles from "./homepage.module.css";

const Page = () => {
  const [username, setUsername] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    link: "",
    description: "",
    image_url: "",
  });
  const [featureDetails, setFeatureDetails] = useState({
    title: "",
    description: "",
    size: "Easy",
    type: "UIDesign",
    image_url: "",
    project_id: "",
  });
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    type: "UIDesign",
    size: "Easy",
    feature_id: "",
  });

  const handleCreateUser = async () => {
    const response = await fetch("/api/create/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    console.log("Create User:", data);
  };

  const handleCreateProject = async () => {
    const response = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectDetails),
    });
    const data = await response.json();
    console.log("Create Project:", data);
  };

  const handleCreateFeature = async () => {
    const response = await fetch("/api/feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(featureDetails),
    });
    const data = await response.json();
    console.log("Create Feature:", data);
  };

  const handleCreateTask = async () => {
    const response = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskDetails),
    });
    const data = await response.json();
    console.log("Create Task:", data);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        <h3>This is the homepage login to see your tasks at the dashboard</h3>
      </header>
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        <h2>Create Project</h2>
        <input
          type="text"
          placeholder="Link"
          value={projectDetails.link}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, link: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={projectDetails.description}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={projectDetails.image_url}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, image_url: e.target.value })
          }
        />
        <button onClick={handleCreateProject}>Create Project</button>
      </div>
      <div>
        <h2>Create Feature</h2>
        <input
          type="text"
          placeholder="Title"
          value={featureDetails.title}
          onChange={(e) =>
            setFeatureDetails({ ...featureDetails, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={featureDetails.description}
          onChange={(e) =>
            setFeatureDetails({
              ...featureDetails,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Size"
          value={featureDetails.size}
          onChange={(e) =>
            setFeatureDetails({ ...featureDetails, size: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Type"
          value={featureDetails.type}
          onChange={(e) =>
            setFeatureDetails({ ...featureDetails, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={featureDetails.image_url}
          onChange={(e) =>
            setFeatureDetails({ ...featureDetails, image_url: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Project ID"
          value={featureDetails.project_id}
          onChange={(e) =>
            setFeatureDetails({ ...featureDetails, project_id: e.target.value })
          }
        />
        <button onClick={handleCreateFeature}>Create Feature</button>
      </div>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={taskDetails.title}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={taskDetails.description}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Type"
          value={taskDetails.type}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Size"
          value={taskDetails.size}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, size: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Feature ID"
          value={taskDetails.feature_id}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, feature_id: e.target.value })
          }
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
    </div>
  );
};

export default Page;
