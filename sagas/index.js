import 'regenerator-runtime/runtime'
import regeneratorRuntime from 'regenerator-runtime'
import { put, takeEvery } from 'redux-saga/effects'
import { actions } from '../lib/constants'
import db from '../services/firebase'

export function* addTodoFirebase(todo) {
  // Allocate a new todo reference
  const todoRef = db.ref('todo').push()
  let todoObj
  let firebaseErr
  // Yield to Firebase async
  yield todoRef.set({
    text: todo.text,
    completed: !!todo.completed
  })
    .then(() => todoRef.once('value'))
    .then(res => {
      todoObj = {
        id: res.key,
        ...res.val()
      }
    }).catch(err => { firebaseErr = err })
  // Handle Error or Completion
  if (firebaseErr) {
    console.error(actions.ADD_TODO_FAILED, firebaseErr)
    yield put({
      ...todo,
      err: firebaseErr,
      type: actions.ADD_TODO_FAILED
    })
  } else {
    console.info(actions.ADDED_TODO, todoObj)
    yield put({
      ...todoObj,
      type: actions.ADDED_TODO
    })
  }
}

export function* toggleTodoFirebase(todo) {
  // Get todo reference
  const todoRef = db.ref('todo').child(todo.id)
  let todoObj
  let firebaseErr
  // Yield to Firebase async
  yield todoRef.once('value')
    .then(res => {
      todoObj = {
        id: res.key,
        ...res.val()
      }
      // Toggle
      todoObj.completed = !todoObj.completed
      // Save
      return todoRef.update({
        completed: todoObj.completed
      })
    }).catch(err => { firebaseErr = err })
  // Handle Error or Completion
  if (firebaseErr) {
    console.error(actions.TOGGLE_TODO_FAILED, firebaseErr)
    yield put({
      ...todo,
      err: firebaseErr,
      type: actions.TOGGLE_TODO_FAILED
    })
  } else {
    console.info(actions.TOGGLED_TODO, todoObj)
    yield put({
      ...todoObj,
      type: actions.TOGGLED_TODO
    })
  }
}

export function* removeTodoFirebase(todo) {
  // Get todo reference
  const todoRef = db.ref('todo').child(todo.id)
  let firebaseErr
  // Yield to Firebase async
  yield todoRef.remove().catch(err => { firebaseErr = err })
  // Handle Error or Completion
  if (firebaseErr) {
    console.error(actions.REMOVE_TODO_FAILED, firebaseErr)
    yield put({
      ...todo,
      err: firebaseErr,
      type: actions.REMOVE_TODO_FAILED
    })
  } else {
    console.info(actions.REMOVED_TODO, todo)
    yield put({
      ...todo,
      type: actions.REMOVED_TODO
    })
  }
}

export function* fetchTodoListFirebase() {
  // Get todo reference
  const todoListRef = db.ref('todo')
  let todoObjs
  let firebaseErr
  // Yield to Firebase async
  yield todoListRef.once('value')
    .then(res => {
      const todoListMap = res.val()
      todoObjs = Object.keys(todoListMap).map(id => Object({
        ...todoListMap[id],
        id
      }))
    }).catch(err => { firebaseErr = err })
  // Handle Error or Completion
  if (firebaseErr) {
    console.error(actions.FETCH_TODO_LIST_FAILED, firebaseErr)
    yield put({
      err: firebaseErr,
      type: actions.FETCH_TODO_LIST_FAILED
    })
  } else {
    console.info(actions.FETCHED_TODO_LIST, todoObjs)
    yield put({
      list: todoObjs,
      type: actions.FETCHED_TODO_LIST
    })
  }
}

export default function* watchTodo() {
  yield takeEvery(actions.ADD_TODO, addTodoFirebase)
  yield takeEvery(actions.TOGGLE_TODO, toggleTodoFirebase)
  yield takeEvery(actions.REMOVE_TODO, removeTodoFirebase)
  yield takeEvery(actions.FETCH_TODO_LIST, fetchTodoListFirebase)
}

// Global export, to satisfy eslint && other deps
// TODO: Figure out how to centralize... this is really annoying
if (typeof window !== 'undefined') {
  window.regeneratorRuntime = regeneratorRuntime
}
