function TodoItem(props) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '16px 20px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      borderLeft: props.todo.completed ? '4px solid #10b981' : '4px solid #4F46E5'
    }}>

      {/* LEFT SIDE - checkbox + task text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '20px' }}>
          {props.todo.completed ? '✅' : '⬜'}
        </span>
        <span style={{
          fontSize: '15px',
          textDecoration: props.todo.completed ? 'line-through' : 'none',
          color: props.todo.completed ? '#9ca3af' : '#111827'
        }}>
          {props.todo.task}
        </span>
      </div>

      {/* RIGHT SIDE - buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => props.onComplete(props.todo.id)}
          style={{
            backgroundColor: props.todo.completed ? '#f3f4f6' : '#ecfdf5',
            color: props.todo.completed ? '#6b7280' : '#10b981',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {props.todo.completed ? 'Undo' : '✓ Done'}
        </button>
        <button
          onClick={() => props.onDelete(props.todo.id)}
          style={{
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🗑 Delete
        </button>
      </div>

    </div>
  )
}

export default TodoItem