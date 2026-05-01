import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const API = 'https://todo-api-yxa6.onrender.com'

function TodoPage() {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    fetch(`${API}/api/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log('Error:', error))
  }, [])

  function addTodo(task) {
    fetch(`${API}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ task: task })
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]))
      .catch((error) => console.log('Error:', error))
  }

  function completeTodo(id) {
    const todo = todos.find((t) => t.id === id)
    fetch(`${API}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ task: todo.task, completed: !todo.completed })
    })
      .then((res) => res.json())
      .then((data) => setTodos(todos.map((t) => t.id === id ? data : t)))
      .catch((error) => console.log('Error:', error))
  }

  function deleteTodo(id) {
    fetch(`${API}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => setTodos(todos.filter((t) => t.id !== id)))
      .catch((error) => console.log('Error:', error))
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      {/* NAVBAR */}
      <div style={{
        backgroundColor: '#4F46E5',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>📝 MyTodos</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'white',
            color: '#4F46E5',
            border: 'none',
            padding: '8px 18px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '0 16px'
      }}>

        {/* HEADER */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>My Todos</h1>
          <p style={{ color: '#6b7280', marginTop: '6px', fontSize: '14px' }}>
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        {/* FORM + LIST */}
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onComplete={completeTodo}
          onDelete={deleteTodo}
        />

      </div>
    </div>
  )
}

export default TodoPage