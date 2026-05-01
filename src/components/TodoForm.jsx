import { useState } from "react"

function TodoForm(props) {
  const [task, setTask] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!task.trim()) return
    props.onAddTodo(task)
    setTask('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '24px'
      }}
    >
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          flex: 1,
          padding: '12px 16px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '15px',
          outline: 'none',
          backgroundColor: 'white'
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        + Add
      </button>
    </form>
  )
}

export default TodoForm