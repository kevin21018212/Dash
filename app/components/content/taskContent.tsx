import React from "react";
import styles from "./taskContent.module.scss";
import EditableContent from "./modules/editContent";
import { handleSaveTask, handleDeleteTask } from "./modules/contentHandlers";
import { TaskSize, TaskType } from "@/app/utils/enums";

const TaskContent = ({ task, onTaskUpdate }) => {
  return (
    <div className={styles.taskDetail}>
      <EditableContent
        initialContent={task}
        onSave={(updatedTask) =>
          handleSaveTask(task, updatedTask, onTaskUpdate)
        }
        onDelete={() => handleDeleteTask(task, onTaskUpdate)}
      >
        {({ editedContent, handleInputChange, isEditing }) => (
          <>
            <div className={styles.topSection}>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={editedContent.title}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                <p>{editedContent.title}</p>
              )}
            </div>
            <div className={styles.bottomSection}>
              {isEditing ? (
                <div>
                  <select
                    name="type"
                    value={editedContent.type}
                    onChange={handleInputChange}
                    className={`${styles.dropdown} ${
                      styles[editedContent.type]
                    }`}
                  >
                    {Object.values(TaskType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <select
                    name="size"
                    value={editedContent.size}
                    onChange={handleInputChange}
                    className={`${styles.dropdown} ${
                      styles[editedContent.size]
                    }`}
                  >
                    {Object.values(TaskSize).map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="description"
                    value={editedContent.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.taskBars}>
                    <div
                      className={`${styles.taskType} ${
                        styles[editedContent.type]
                      }`}
                    >
                      {editedContent.type}
                    </div>
                    <div
                      className={`${styles.taskSize} ${
                        styles[editedContent.size]
                      }`}
                    >
                      {editedContent.size}
                    </div>
                  </div>
                  <div className={styles.description}>
                    {editedContent.description}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </EditableContent>
    </div>
  );
};

export default TaskContent;
