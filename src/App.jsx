import { useState } from "react"
import "./styles.css"

export default function App() {

  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  /*
    handleSubmit()
      - prevenets page from reloading
      - sets Todos with what is being inputted in the form (line 54)
      - returns the todo with: unique id, title, and completed boolean
      - ends with setting new item to " " so form clears
  */
  function handleSubmit(e) {
    e.preventDefault()

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(),
        title: newItem,
        completed: false
      },
      ]
    })

    setNewItem("")
  }

  /*
    toggleTodo()
      - takes in the todo's id and completed boolean
      - iterated through current todos and sets new state
      - returns checked if completed is true
  */
  function toggleTodo(id, completed) {
    setTodos(currentTodos =>{
      return currentTodos.map(todo => {
        if(todo.id === id){
          return {...todo, completed }
        }

        return todo
      })

    })
  }

  /*
    deleteTodo()
      - takes in the todo's id
      - filters out the todo if true
  */
  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            // onChange is needed to update our state
            // Notice how it uses setNewItem with the value that is being changed
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item" />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">Todo List</h1>
      <ul className="list">
        {/* Short circuit is used to display "No Todos" if there are none */}
        {todos.length === 0 && "No Todos"}
        {/* Iterated through todos and if they exist displays html */}
        {todos.map(todo =>{ 
          return (
          <li key={todo.id}>
            <label>
                <input type="checkbox" checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
  </>
  ) 
}