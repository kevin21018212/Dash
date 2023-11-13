import React, { FC } from "react";
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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
  return (
    <div className={styles.todosContainer}>
      {todos &&
        todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
    </div>
  );
};

export default TodoList;
