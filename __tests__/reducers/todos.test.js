import { actions } from '../../lib/constants'
import reducer from '../../reducers/todos'

describe('reducer/todos', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('should handle ADDED_TODO', () => {
    expect(
      reducer([], {
        id: 'test',
        type: actions.ADDED_TODO,
        text: 'Solo TODO'
      })
    ).toEqual([
      {
        text: 'Solo TODO',
        completed: false,
        id: 'test'
      }
    ])

    expect(
      reducer(
        [
          {
            text: 'First TODO',
            completed: false,
            id: 'test0'
          }
        ],
        {
          type: actions.ADDED_TODO,
          text: 'Second TODO',
          id: 'test1'
        }
      )
    ).toEqual([
      {
        text: 'First TODO',
        completed: false,
        id: 'test0'
      },
      {
        text: 'Second TODO',
        completed: false,
        id: 'test1'
      }
    ])
  })

  it('should handle TOGGLED_TODO', () => {
    expect(
      reducer([
        {
          id: 'test',
          completed: false,
          text: 'Toggle Test'
        }
      ], {
        id: 'test',
        type: actions.TOGGLED_TODO,
        completed: true
      })
    ).toEqual([
      {
        text: 'Toggle Test',
        completed: true,
        id: 'test'
      }
    ])
  })

  it('should handle REMOVED_TODO', () => {
    expect(
      reducer([
        {
          id: 'test',
          completed: false,
          text: 'Remove Test'
        }
      ], {
        id: 'test',
        type: actions.REMOVED_TODO
      })
    ).toEqual([])
  })
})
