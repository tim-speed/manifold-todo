import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const testHelper = {
  _waiters: {},
  /**
   * Method to receive actions through the store
   */
  _reducer(state, action) {
    const waiters = this._waiters[action.type]
    if (waiters && waiters.length) {
      // Call each waiter
      waiters.forEach(waiter => waiter(action))
      // Clear
      delete this._waiters[action.type]
    }
    return state
  },
  /**
   * Run the specified saga through the testHelper
   */
  async initSaga(saga) {
    const sagaMiddleware = createSagaMiddleware()
    const store = this.store = createStore(this._reducer.bind(this),
      applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(saga, store.dispatch)
  },
  /**
   * Proxy to dispatch action on the current store
   */
  dispatch(action) {
    if (typeof action === 'string') {
      action = { type: action }
    }
    this.store.dispatch(action)
  },
  /**
   * Helper function to await a specific change to pass through the reducer
   */
  async waitForChange(type, handler) {
    return new Promise((resolve, reject) => {
      const waiters = this._waiters[type] = this._waiters[type] || []
      waiters.push(action => resolve(handler(action)))
      // TODO: Add timeout
    })
  },
  /**
   * Helper function to await a change and expect an outcome
   */
  async expectChange(expected) {
    const action = await this.waitForChange(expected.type, action => action)
    expect(action).toEqual(expect.objectContaining(expected))
  },
  /**
   * Cleanup for after a saga test
   */
  async clearSaga() {
    delete this.store
    this._waiters = {}
  }
}

export default testHelper
