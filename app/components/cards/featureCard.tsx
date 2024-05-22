"use client";
import { useState } from "react";
import styles from "./featureCard.module.css";
import { TaskSize, TaskType } from "@/app/utils/enums";

const FeatureCard = ({ projectId }) => {
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="taskType">Task Type</label>
        <select
          id="taskType"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          required
        >
          {Object.values(TaskType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="taskSize">Task Size</label>
        <select
          id="taskSize"
          value={taskSize}
          onChange={(e) => setTaskSize(e.target.value)}
          required
        >
          {Object.values(TaskSize).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.submitButton}>
        Create Feature
      </button>
    </form>
  );
};

export default FeatureCard;
