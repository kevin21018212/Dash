"use client";
import { useState } from "react";
import { TaskSize, TaskType } from "@/app/utils/enums";
import form from "./form.module.scss";
import common from "@/app/common.module.scss";
import FormField from "./formField";
import { motion } from "framer-motion";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import { dbProject, dbFeature, dbTask } from "@/app/types";

const CreateComponent = ({ type, parentId, onCancel }) => {
  const { createProject, createFeature, createTask } = useContentHandlers();
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
    };

    if (type === "project") {
      data = {
        ...data,
        image_url: imageUrl,
        link: "",
      };
      createProject(data as dbProject, onCancel);
    } else if (type === "feature") {
      data = {
        ...data,
        project_id: parentId,
      };
      createFeature(data as dbFeature, parentId, onCancel);
    } else if (type === "task") {
      data = {
        ...data,
        image_url: imageUrl,
        type: taskType,
        size: taskSize,
        feature_id: parentId,
      };
      createTask(data as dbTask, parentId, onCancel);
    }
  };

  return (
    <div>
      <h2 className={form.title}>
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
