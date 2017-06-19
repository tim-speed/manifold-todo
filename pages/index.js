import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import todoApp from '../reducers'
import App from '../components/App'
import saga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(todoApp, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(saga, store.dispatch)
store.dispatch({
  type: 'FETCH_TODO_LIST'
})

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Index
