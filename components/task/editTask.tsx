import React, { useState, useRef, useEffect } from "react";
import { Task } from "@/app/types";
import { EditableField, EditableDropdown } from "../global/form/edit";
import styles from "./taskContent.module.scss";
import common from "@/app/common.module.scss";
import { useContentHandlers } from "@/app/utils/contentHandlers";
import TaskModal from "../global/function/taskmodal";
import { TaskType, TaskSize } from "@/app/utils/enums";
import useClickOutside from "@/app/utils/contentFunctions";

interface EditTaskProps {
  task: Task;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
  const { handleFieldChange, saveTask, deleteTask } = useContentHandlers();
  const [editedTask, setEditedTask] = useState<Task>(task);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  return (
    <TaskModal isOpen={true} onClose={onClose}>
      <div ref={modalRef} className={styles.taskDetailModal}>
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
              handleFieldChange("description", value, editedTask, setEditedTask)
            }
            type="textArea"
          />
        </div>
        <div className={common.actionButtons}>
          <button
            onClick={() => {
              saveTask(task, editedTask);
              onClose();
            }}
            className={common.saveButton}
          >
            Save
          </button>
          <button
            onClick={() => {
              deleteTask(task);
              onClose();
            }}
            className={common.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </TaskModal>
  );
};

export default EditTask;
