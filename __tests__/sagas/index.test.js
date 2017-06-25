import testHelper from '../../lib/testHelper'
import { actions } from '../../lib/constants'
import saga from '../../sagas'

let toggleTodoId

describe('sagas/index', () => {
  beforeAll(() => {
    return testHelper.initSaga(saga).then(() => {
      // Add a default entry to the test DB we can use with toggle
      testHelper.dispatch({
        type: actions.ADD_TODO,
        text: 'Toggle test'
      })
      return testHelper.waitForChange(actions.ADDED_TODO, action => {
        toggleTodoId = action.id
      })
    })
  })

  it('should handle ADD_TODO', () => {
    testHelper.dispatch({
      type: actions.ADD_TODO,
      text: 'test'
    })
    return testHelper.expectChange({
      type: actions.ADDED_TODO,
      id: expect.any(String),
      text: 'test',
      completed: false
    })
  })

  it('should handle TOGGLE_TODO', () => {
    testHelper.dispatch({
      type: actions.TOGGLE_TODO,
      id: toggleTodoId
    })
    return testHelper.expectChange({
      type: actions.TOGGLED_TODO,
      id: toggleTodoId,
      completed: true
    })
  })

  it('should handle FETCH_TODO_LIST', () => {
    testHelper.dispatch(actions.FETCH_TODO_LIST)
    return testHelper.expectChange({
      type: actions.FETCHED_TODO_LIST,
      list: expect.arrayContaining([
        expect.objectContaining({
          id: toggleTodoId
        })
      ])
    })
  })

  afterAll(() => {
    return testHelper.clearSaga()
  })
})
