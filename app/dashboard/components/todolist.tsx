// TodoList.tsx
import React from "react";
import styles from "../page.module.css";
import TodoCard from "./todocard";

interface Todo {
  _id: number;
  title: string;
  complete: boolean;
  createdAt: string;
  isClicked: boolean;
}

interface TodoListProps {
  todos: Todo[];
  mutate: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, mutate }) => {
  return (
    <div className={styles.todosContainer}>
      {todos &&
        todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo} mutate={mutate} />
        ))}
    </div>
  );
};

export default TodoList;
