import { useState } from "react";
import { TaskType, TaskSize, TaskStatus } from "@/app/utils/enums";
import form from "./form.module.scss";
import common from "@/app/common.module.scss";

import { motion } from "framer-motion";
import FormField from "./formField";

const CreateTask = ({ parentId, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Easy);
  const [taskStatus, setTaskStatus] = useState(TaskStatus.TODO);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      feature_id: parentId,
      type: taskType,
      size: taskSize,
      status: taskStatus,
    };

    const response = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setTaskType(TaskType.UIDesign);
      setTaskSize(TaskSize.Easy);
      setTaskStatus(TaskStatus.TODO);
    } else {
      console.error("Failed to create task");
    }
  };

  return (
    <div>
      <h3 className={form.title}>Create Task</h3>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          options={undefined}
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          options={undefined}
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
        <FormField
          label="Task Status"
          type="select"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          options={Object.values(TaskStatus)}
          required
        />
        <div className={form.buttonGroup}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className={common.saveButton}
          >
            Create Task
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            className={common.deleteButton}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
const CreateProject = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      image_url: imageUrl,
    };

    const response = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
    } else {
      console.error("Failed to create project");
    }
  };

  return (
    <div>
      <h3 className={form.title}>Create Project</h3>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          options={undefined}
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          options={undefined}
        />
        <FormField
          label="Image URL"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          options={undefined}
        />
        <div className={form.buttonGroup}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className={common.saveButton}
          >
            Create Project
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            className={common.deleteButton}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
};

const CreateFeature = ({ parentId, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      project_id: parentId,
    };

    const response = await fetch("/api/feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
    } else {
      console.error("Failed to create feature");
    }
  };

  return (
    <div>
      <h3 className={form.title}>Create Feature</h3>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          options={undefined}
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          options={undefined}
        />
        <div className={form.buttonGroup}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className={common.saveButton}
          >
            Create Feature
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            className={common.deleteButton}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export { CreateFeature, CreateProject, CreateTask };
