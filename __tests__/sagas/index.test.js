import testHelper from '../../lib/testHelper'
import saga from '../../sagas'

let toggleTodoId

describe('sagas/index', () => {
  beforeAll(() => {
    return testHelper.initSaga(saga).then(() => {
      // Add a default entry to the test DB we can use with toggle
      testHelper.dispatch({
        type: 'ADD_TODO',
        text: 'Toggle test'
      })
      return testHelper.waitForChange('ADDED_TODO', action => {
        toggleTodoId = action.id
      })
    })
  })

  it('should handle ADD_TODO', () => {
    testHelper.dispatch({
      type: 'ADD_TODO',
      text: 'test'
    })
    return testHelper.expectChange({
      type: 'ADDED_TODO',
      id: expect.any(String),
      text: 'test',
      completed: false
    })
  })

  it('should handle TOGGLE_TODO', () => {
    testHelper.dispatch({
      type: 'TOGGLE_TODO',
      id: toggleTodoId
    })
    return testHelper.expectChange({
      type: 'TOGGLED_TODO',
      id: toggleTodoId,
      completed: true
    })
  })

  it('should handle FETCH_TODO_LIST', () => {
    testHelper.dispatch('FETCH_TODO_LIST')
    return testHelper.expectChange({
      type: 'FETCHED_TODO_LIST',
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
