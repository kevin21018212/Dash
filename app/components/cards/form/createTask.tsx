// components/TaskCard.tsx
"use client";
import { useState } from "react";
import FormField from "./formField";
import styles from "./create.module.css";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [featureId, setFeatureId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type,
        size,
        feature_id: featureId,
      }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create Task</h2>
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
        />
        <FormField
          label="Type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <FormField
          label="Size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
        <FormField
          label="Feature ID"
          type="text"
          value={featureId}
          onChange={(e) => setFeatureId(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          Create Task
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
