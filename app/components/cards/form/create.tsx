"use client";
import { useState } from "react";
import { TaskSize, TaskType } from "@/app/utils/enums";
import commonStyles from "@/app/common.module.scss";
import FormField from "./formField";

const CreateComponent = ({ type, parentId, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [taskType, setTaskType] = useState(TaskType.UIDesign);
  const [taskSize, setTaskSize] = useState(TaskSize.Hard);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      image_url: imageUrl,
      [`${type === "task" ? "feature_id" : `${type}_id`}`]: parentId,
      ...(type === "task" && { type: taskType, size: taskSize }),
    };

    const response = await fetch(`/api/create/${type}`, {
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
      <h2 className={commonStyles.title}>
        Create {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
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
          options={undefined}
          required={undefined}
        />
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
        <div className={commonStyles.buttonGroup}>
          <button
            type="submit"
            className={`${commonStyles.button} ${commonStyles.buttonPrimary}`}
          >
            Create {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
          {onCancel != null ? (
            <button
              type="button"
              className={`${commonStyles.button} ${commonStyles.buttonSecondary}`}
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateComponent;
