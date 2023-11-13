import React, { useState, FC } from "react";
import styles from "../page.module.css";

interface Todo {
  _id: number;
  title: string;
  complete: boolean;
  createdAt: string;
  isClicked: boolean;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAction = async (
    id: number,
    method: string,
    actionType: string
  ) => {
    try {
      await fetch(`/api/todos/${id}`, { method });

      setErrorMessage(`${actionType} Todo`);
      setTimeout(() => setErrorMessage(null), 3000);

      if (method === "DELETE") {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(`Failed to ${actionType} Todo`);
    }
  };

  const handleUpdate = (id: number) => handleAction(id, "PUT", "update");
  const handleDelete = (id: number) => handleAction(id, "DELETE", "delete");
  const handleCollapsed = (id: number) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isClicked: todo._id === id && !todo.isClicked,
      }))
    );

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
          <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TodoList;
