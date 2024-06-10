import React, { useState } from "react";
import styles from "./taskContent.module.scss";
import common from "../../common.module.scss";
import { useSaveContent, useDeleteContent } from "@/app/utils/contentHandlers";
import { EditableField, EditableDropdown } from "../global/form/edit";
import { TaskSize, TaskType } from "@/app/utils/enums";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import TaskModal from "../global/function/taskmodal";

interface Task {
  task_id: number;
  title: string;
  type: TaskType;
  size: TaskSize;
  description: string;
}

interface TaskContentProps {
  task: Task;
  refetchProject: () => void;
}

const TaskContent: React.FC<TaskContentProps> = ({ task, refetchProject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const saveTask = useSaveContent(`/api/task?taskId=${task.task_id}`);
  const deleteTask = useDeleteContent(`/api/task?taskId=${task.task_id}`);

  const handleFieldChange = (field: keyof Task, value: any) => {
    setEditedTask({ ...editedTask, [field]: value });
  };

  const handleSave = () => {
    saveTask.mutate(editedTask, { onSuccess: refetchProject });
    setIsEditing(false);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteTask.mutate(undefined, { onSuccess: refetchProject });
  };

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
            <div className={common.actionButtons}>
              <button onClick={handleSave} className={common.saveButton}>
                Save
              </button>
              <button onClick={handleDelete} className={common.deleteButton}>
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
