import React, { useState } from "react";
import styles from "../page.module.css";

const TodoList = ({ todos, setTodos }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      setErrorMessage({
        msg: `Deleted Todo`,
        type: "success",
      });

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      // Use setTodos to update the todos state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      setErrorMessage({
        msg: `Failed to delete Todo`,
        type: "error",
      });
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage({
        msg: `Failed to update Todo`,
        type: "error",
      });
    }
  };

  const handleCollapsed = (id) => {
    // Use setTodos to update the todos state
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id
          ? { ...todo, isClicked: !todo.isClicked }
          : { ...todo, isClicked: false }
      )
    );
  };

  return (
    <div className={styles.todosContainer}>
      {todos &&
        todos.map((todo) => (
          <div key={todo._id} className={styles.todoCard}>
            <div
              onClick={() => handleUpdate(todo._id)}
              className={styles.updateButton}
            >
              Update
            </div>
            <h1>{todo.title}</h1>
            <div
              onClick={() => handleCollapsed(todo._id)}
              className={styles.toggleDetailsButton}
            >
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
                <button
                  onClick={() => handleDelete(todo._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      {errorMessage && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{errorMessage.msg}</span>
        </div>
      )}
    </div>
  );
};

export default TodoList;
