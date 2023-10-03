import { useEffect, useState } from 'react'
import './styles.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

export default function App() {
  const [todos, setTodos] = useState([]) // sets todos state to [] initially
     

  useEffect(() => { // called when the page loads; sets todos state after the promise is resolved
    fetch('/api/get')
      .then((response) => response.json())
      .then((json) => {
        setTodos(json)
      }
    )
  }, [])


  function addTodo(title) {
    let todo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
  
    fetch('/api/add', {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => response.json())
      .then((json) => console.log(json))
      
    setTodos(currentTodos => { // use this function version of setTodos bc React will use the value of todos set at the LAST RE-RENDER
      return [                   // do this any time you need to pass the current value into a set function
        ...currentTodos,
        todo
      ]
    })
  }

  function toggleTodo(id, completed) {
    fetch('/api/toggle', {
      method: "POST",
      body: JSON.stringify({id, completed}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((json) => console.log(json))

    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    fetch('/api/delete', {
      method: "POST",
      body: JSON.stringify({id}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
      .then((json) => console.log(json))

    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}