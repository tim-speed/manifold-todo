import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, onRemoveClick, completed, text }) => (
  <li
    className={completed ? 'todo complete' : 'todo'}
  >
    <span onClick={onClick}>{text}</span>
    <a href='javascript:void(0)' onClick={onRemoveClick}>x</a>
    <style jsx>{`
      .todo.complete > span {
        text-decoration: line-through;
      }
      .todo > a {
        padding: 5px;
        cursor: pointer;
      }
    `}</style>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
