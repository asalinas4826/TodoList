import { TodoItem } from "./TodoItem"

export function TodoList({todos, toggleTodo, deleteTodo}) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"} {/* short-circuiting so that if no todos, returns "No Todos" */}
      {todos.map(todo => {
        return <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      })}
    </ul>
  )
}