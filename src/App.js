import React, {useState, useRef, useEffect}from 'react';
import TodoList from './components/TodoList'
import uuidv4 from 'uuid/v4'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef(); 
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos] 
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleClick = () => {
    const name = todoNameRef.current.value
    if (name === '') {
      return; 
    }
    console.log(name) 
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}] //uuidv4 function generates 
    })
    todoNameRef.current.value = null // clears out input
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
     <TodoList todos={todos} toggleTodo={toggleTodo}/>
     <input type="text" ref={todoNameRef}/>
     <button onClick={handleClick} >Add Todos</button>
     <button onClick={handleClearTodos}>Clear Complete</button>
     <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
 