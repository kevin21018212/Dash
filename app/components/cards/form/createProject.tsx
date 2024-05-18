// components/ProjectCard.tsx
"use client";
import { useState } from "react";
import FormField from "./formField";
import styles from "./create.module.css";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, description, image_url: imageUrl }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create Project</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormField
          label="Link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className={styles.submitButton}>
          Create Project
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
