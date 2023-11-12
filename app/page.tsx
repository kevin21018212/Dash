import TodoFormServerComponent from "./components/TodoFormServer";
import TodoItemServerComponent from "./components/TodoItemServer";
import { getTodos } from "./lib/todo-db";

export default async function Home() {
  const { todos, results } = await getTodos();

  return (
    <div className="container mx-auto max-w-md p-4">
      <TodoFormServerComponent />
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {results === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos?.map((todo) => (
          <TodoItemServerComponent key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
}
