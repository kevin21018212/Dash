"use client";
import { useState } from "react";

import styles from "./create.module.css";
import { TaskSize, TaskType } from "@/app/utils/enums";
import FormField from "./formField";

export default function CreateTask({ featureId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Hard);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const TaskData = {
      title,
      description,
      size: taskSize,
      type: taskType,
      feature_id: featureId,
    };

    const response = await fetch("/api/create/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TaskData),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setTaskType(TaskType.UIDesign);
      setTaskSize(TaskSize.Easy);
      setMessage("Task created successfully!");
    } else {
      setMessage("Failed to create task");
    }
  };

  return (
    <div className={styles.taskCard}>
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
          Create Task
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
