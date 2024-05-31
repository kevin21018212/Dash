import React from "react";
import styles from "./taskContent.module.scss";
import EditableContent from "../global/modules/editContent";
import EditForm from "../global/modules/editForm"; // Import the new EditForm component
import {
  handleSaveTask,
  handleDeleteTask,
} from "../global/modules/contentHandlers";
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
        renderContent={({ editedContent }) => (
          <>
            <div className={styles.topSection}>
              <p>{editedContent.title}</p>
            </div>
            <div className={styles.bottomSection}>
              <div className={styles.taskBars}>
                <div
                  className={`${styles.taskType} ${styles[editedContent.type]}`}
                >
                  {editedContent.type}
                </div>
                <div
                  className={`${styles.taskSize} ${styles[editedContent.size]}`}
                >
                  {editedContent.size}
                </div>
              </div>
              <div className={styles.description}>
                {editedContent.description}
              </div>
            </div>
          </>
        )}
        EditFormComponent={EditForm} // Pass the EditForm component as a prop
      />
    </div>
  );
};

export default TaskContent;
