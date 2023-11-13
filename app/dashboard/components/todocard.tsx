import React, { FC } from "react";
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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, setTodos }) => {
  const handleUpdate = async () => {
    try {
      await fetch(`/api/todos/${todo._id}`, { method: "PUT" });

      setTodos((prevTodos) =>
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

      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCollapsed = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => ({
        ...t,
        isClicked: t._id === todo._id ? !t.isClicked : t.isClicked,
      }))
    );
  };
  return (
    <div className={styles.todoCard}>
      <div onClick={handleUpdate} className={styles.updateButton}>
        Update
      </div>
      <h1>{todo.title}</h1>
      <div onClick={handleCollapsed} className={styles.toggleDetailsButton}>
        Toggle Details
      </div>
      {todo.isClicked && (
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
