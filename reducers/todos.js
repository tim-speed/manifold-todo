const todos = (state = [], action) => {
  switch (action.type) {
    case 'TODO_LIST_RECEIVED':
      return action.list
    case 'ADDED_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLED_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: action.completed}
          : todo
      )
    default:
      return state
  }
}

export default todos
