import React from "react";
import styles from "./taskContent.module.scss";
import EditableContent from "./modules/editContent";
import { handleSaveTask, handleDeleteTask } from "./modules/contentHandlers";

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
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedContent.title}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <select
                  name="size"
                  value={editedContent.size}
                  onChange={handleInputChange}
                  className={styles.dropdown}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <select
                  name="content"
                  value={editedContent.content}
                  onChange={handleInputChange}
                  className={styles.dropdown}
                >
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
                  <option value="improvement">Improvement</option>
                </select>
                <textarea
                  name="description"
                  value={editedContent.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
              </>
            ) : (
              <>
                <div className={styles.textDisplay}>
                  <strong>Title: </strong>
                  {editedContent.title}
                </div>
                <div className={styles.textDisplay}>
                  <strong>Size: </strong>
                  {editedContent.size}
                </div>
                <div className={styles.textDisplay}>
                  <strong>Content: </strong>
                  {editedContent.content}
                </div>
                <div className={styles.textDisplay}>
                  <strong>Description: </strong>
                  {editedContent.description}
                </div>
              </>
            )}
          </>
        )}
      </EditableContent>
    </div>
  );
};

export default TaskContent;
