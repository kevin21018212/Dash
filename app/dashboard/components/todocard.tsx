import React, { useState } from "react";
import styles from "../page.module.css";

interface Todo {
  _id: number;
  title: string;
  complete: boolean;
  createdAt: string;
  isClicked: boolean;
}

interface TodoCardProps {
  todo: Todo;
  mutate: (callback: (prevTodos: Todo[]) => Todo[]) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, mutate }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      await fetch(`/api/todos/${todo._id}`, { method: "PUT" });
      mutate((prevTodos) =>
        prevTodos.map((t) =>
          t._id === todo._id ? { ...t, complete: !t.complete } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/todos/${todo._id}`, { method: "DELETE" });
      mutate((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDetails = () => {
    setIsDetailsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={styles.todoCard}>
      <div onClick={handleUpdate} className={styles.updateButton}>
        Update
      </div>
      <h1>{todo.title}</h1>
      <div onClick={handleToggleDetails} className={styles.toggleDetailsButton}>
        Toggle Details
      </div>
      {isDetailsOpen && (
        <div className={styles.todoDetails}>
          <p>
            <strong>Completed:</strong>{" "}
            {todo.complete ? "Completed" : "Not Completed"}
          </p>
          <p>
            <strong>Created At:</strong> {todo.createdAt}
          </p>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
