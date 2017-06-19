import 'regenerator-runtime/runtime'
import regeneratorRuntime from 'regenerator-runtime'
import { put, takeEvery } from 'redux-saga/effects'
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
    console.error('ADD_TODO_FAILED', firebaseErr)
    yield put({
      ...todo,
      err: firebaseErr,
      type: 'ADD_TODO_FAILED'
    })
  } else {
    console.info('ADDED_TODO', todoObj)
    yield put({
      ...todoObj,
      type: 'ADDED_TODO'
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
    console.error('TOGGLE_TODO_FAILED', firebaseErr)
    yield put({
      ...todo,
      err: firebaseErr,
      type: 'TOGGLE_TODO_FAILED'
    })
  } else {
    console.info('TOGGLED_TODO', todoObj)
    yield put({
      ...todoObj,
      type: 'TOGGLED_TODO'
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
    console.error('FETCH_TODO_LIST_FAILED', firebaseErr)
    yield put({
      err: firebaseErr,
      type: 'FETCH_TODO_LIST_FAILED'
    })
  } else {
    console.info('TODO_LIST_RECEIVED', todoObjs)
    yield put({
      list: todoObjs,
      type: 'TODO_LIST_RECEIVED'
    })
  }
}

export default function* watchTodo() {
  yield takeEvery('ADD_TODO', addTodoFirebase)
  yield takeEvery('TOGGLE_TODO', toggleTodoFirebase)
  yield takeEvery('FETCH_TODO_LIST', fetchTodoListFirebase)
}

// Global export, to satisfy eslint && other deps
// TODO: Figure out best way to have global app bootstrap for nextJS and put it there
if (typeof window !== 'undefined') {
  window.regeneratorRuntime = regeneratorRuntime
}
