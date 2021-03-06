import React from 'react'
import Todo from '../../components/Todo'
import { shallow } from 'enzyme'

describe('components/Todo', () => {
  it('should render with provided text without strike-through by default',
    () => {
      const component = shallow(
        <Todo text='Test Item' completed={false} onClick={() => {}}
          onRemoveClick={() => {}} />
      )
      expect(component.find('span').text()).toEqual('Test Item')
      expect(component.find('li').hasClass('complete')).toEqual(false)
    })
  it('should fire onClick when clicked',
    () => {
      let clicked = false
      const component = shallow(
        <Todo text='Test Item' completed={false} onClick={() => {
          clicked = true
        }} onRemoveClick={() => {
          clicked = true
        }} />
      )
      component.find('span').simulate('click')
      expect(clicked).toEqual(true)
      clicked = false
      component.find('a').simulate('click')
      expect(clicked).toEqual(true)
    })
  it('should render with provided text with strike-through when complete',
    () => {
      const component = shallow(
        <Todo text='Different Test Item' completed={true} onClick={() => {}}
          onRemoveClick={() => {}} />
      )
      expect(component.find('span').text()).toEqual('Different Test Item')
      expect(component.find('li').hasClass('complete')).toEqual(true)
    })
})
