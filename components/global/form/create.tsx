"use client";
import { useState } from "react";
import { TaskSize, TaskType } from "@/app/utils/enums";
import form from "./form.module.scss";
import common from "@/app/common.module.scss";
import FormField from "./formField";
import { motion } from "framer-motion";
import { dbProject, dbFeature, dbTask } from "@/app/types";

const CreateComponent = ({ type, parentId, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Hard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let data: Partial<dbProject & dbFeature & dbTask> = {
      title,
      description,
      ...(type === "task" && { image_url: imageUrl }),
      [`${type === "task" ? "feature_id" : "project_id"}`]: parentId,
      ...(type === "task" && { type: taskType, size: taskSize }),
    };

    const response = await fetch(`/api/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setImageUrl("");
      if (type === "task") {
        setTaskType(TaskType.UIDesign);
        setTaskSize(TaskSize.Easy);
      }
    } else {
      console.error(`Failed to create ${type}`);
    }
  };

  return (
    <div>
      <h3 className={form.title}>
        Create {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
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
        {type === "project" && (
          <FormField
            label="Image URL"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            options={undefined}
            required={undefined}
          />
        )}
        {type === "task" && (
          <>
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
          </>
        )}
        <div className={form.buttonGroup}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className={common.saveButton}
          >
            Create {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
          {onCancel != null ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              className={common.deleteButton}
              onClick={onCancel}
            >
              Cancel
            </motion.button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateComponent;
