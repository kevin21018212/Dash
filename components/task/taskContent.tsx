import React, { useState } from "react";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import styles from "./taskContent.module.scss";
import common from "@/app/common.module.scss";
import { EditableField, EditableDropdown } from "../global/form/edit";
import { TaskSize, TaskType } from "@/app/utils/enums";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import TaskModal from "../global/function/taskmodal";
import { Task } from "@/app/types";

interface TaskContentProps {
  task: Task;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  const { handleFieldChange, saveTask, deleteTask } = useContentHandlers();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} className={styles.taskDetail}>
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
        <FiEdit className={common.editIcon} onClick={handleEditClick} />
      </motion.div>

      {isEditModalOpen && (
        <TaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className={styles.taskDetailModal}>
            <div className={styles.topSection}>
              <EditableField
                value={editedTask.title}
                onSave={(value) =>
                  handleFieldChange("title", value, editedTask, setEditedTask)
                }
              />
              <div className={styles.buttons}>
                <EditableDropdown
                  value={editedTask.type}
                  options={Object.values(TaskType)}
                  optionstwo={Object.values(TaskSize)}
                  onSave={(value) =>
                    handleFieldChange("type", value, editedTask, setEditedTask)
                  }
                />
              </div>
            </div>
            <div className={styles.bottomSection}>
              <EditableField
                value={editedTask.description}
                onSave={(value) =>
                  handleFieldChange(
                    "description",
                    value,
                    editedTask,
                    setEditedTask
                  )
                }
                type="textArea"
              />
            </div>
            <div className={common.actionButtons}>
              <button
                onClick={() =>
                  saveTask(task, editedTask, setIsEditing, setIsEditModalOpen)
                }
                className={common.saveButton}
              >
                Save
              </button>
              <button
                onClick={() => deleteTask(task)}
                className={common.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        </TaskModal>
      )}
    </>
  );
};

export default TaskContent;
