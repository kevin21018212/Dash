"use client";
import { useState } from "react";
import { TaskType, TaskSize } from "@prisma/client";
import styles from "./featureCard.module.css"; // Import the CSS module

const FeatureCard = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(""); // Default value
  const [size, setSize] = useState(""); // Default value
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type,
        size,
        image_url: imageUrl,
        project_id: projectId,
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Create Feature</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className={styles.select}
        >
          {Object.keys(TaskType).map((key) => (
            <option key={key} value={TaskType[key]}>
              {TaskType[key]}
            </option>
          ))}
        </select>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className={styles.select}
        >
          {Object.keys(TaskSize).map((key) => (
            <option key={key} value={TaskSize[key]}>
              {TaskSize[key]}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Feature
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default FeatureCard;
