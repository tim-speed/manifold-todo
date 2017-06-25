import { actions } from '../lib/constants'

const todos = (state = [], action) => {
  switch (action.type) {
    case actions.FETCHED_TODO_LIST:
      return action.list
    case actions.ADDED_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case actions.TOGGLED_TODO:
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
