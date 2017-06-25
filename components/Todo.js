import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    className={completed ? 'complete' : undefined}
  >
    <span>{text}</span>
    <style jsx>{`
      .complete {
        text-decoration: line-through;
      }
    `}</style>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
