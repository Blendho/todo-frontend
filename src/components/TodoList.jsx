import TodoItem from './TodoItem'

function TodoList(props) {
  if (props.todos.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#9ca3af',
        fontSize: '15px'
      }}>
        No todos yet. Add one above! 👆
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={props.onComplete}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  )
}

export default TodoList