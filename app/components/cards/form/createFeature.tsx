// components/FeatureCard.tsx
"use client";
import { useState } from "react";
import FormField from "./formField";
import { TaskSize, TaskType } from "@/app/utils/enums";
import styles from "./create.module.css";

const CreateFeature = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Hard);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featureData = {
      title,
      description,
      size: taskSize,
      type: taskType,
      image_url: imageUrl,
      project_id: projectId,
    };

    const response = await fetch("/api/create/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setTaskType(TaskType.UIDesign);
      setTaskSize(TaskSize.Easy);
    } else {
      console.error("Failed to create feature");
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create Feature</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormField
          label="Image URL"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <FormField
          label="Task Type"
          type="select"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          options={Object.values(TaskType)}
          required
        />
        <FormField
          label="Task Size"
          type="select"
          value={taskSize}
          onChange={(e) => setTaskSize(e.target.value)}
          options={Object.values(TaskSize)}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Create Feature
        </button>
      </form>
    </div>
  );
};

export default CreateFeature;
