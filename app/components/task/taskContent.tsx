import React, { useState, useEffect, useRef } from "react";
import styles from "./taskContent.module.scss";
import common from "../../common.module.scss";
import { handleSaveTask, handleDeleteTask } from "@/app/utils/contentHandlers";
import { EditableField, EditableDropdown } from "../global/form/edit";
import { TaskSize, TaskType } from "@/app/utils/enums";
import { FiEdit } from "react-icons/fi";
const TaskContent = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const taskDetailRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field, value) => {
    setEditedTask({ ...editedTask, [field]: value });
  };

  const handleSave = () => {
    handleSaveTask(task, editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteTask(task);
  };

  const handleClickOutside = (event) => {
    if (
      taskDetailRef.current &&
      !taskDetailRef.current.contains(event.target)
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <>
          <div ref={taskDetailRef} className={styles.taskDetail}>
            <div className={styles.topSection}>
              <EditableField
                value={editedTask.title}
                onSave={(value) => handleFieldChange("title", value)}
              />
              <div className={styles.buttons}>
                <EditableDropdown
                  value={editedTask.type}
                  options={Object.values(TaskType)}
                  optionstwo={Object.values(TaskSize)}
                  onSave={(value) => handleFieldChange("type", value)}
                />
              </div>
            </div>

            <div className={styles.bottomSection}>
              <EditableField
                value={editedTask.description}
                onSave={(value) => handleFieldChange("description", value)}
                type="textArea"
              />
            </div>
            <div className={styles.actionButtons}>
              <button onClick={handleSave} className={common.saveButton}>
                Save
              </button>
              <button onClick={handleDelete} className={common.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <div ref={taskDetailRef} className={styles.taskDetail}>
          <div className={styles.topSection}>
            <p>{task.title}</p>
            <div className={styles.buttons}>
              <div className={`${styles.taskType} ${styles[task.type]}`}>
                {task.type}
              </div>
              <div className={`${styles.taskSize} ${styles[task.size]}`}>
                {task.size}
              </div>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.description}>{task.description}</div>
          </div>
          <FiEdit
            className={common.editIcon}
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </>
  );
};

export default TaskContent;
