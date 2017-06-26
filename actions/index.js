import { actions } from '../lib/constants'

export const addTodo = text => {
  return {
    type: actions.ADD_TODO,
    text
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: actions.SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: actions.TOGGLE_TODO,
    id
  }
}

export const removeTodo = id => {
  return {
    type: actions.REMOVE_TODO,
    id
  }
}
