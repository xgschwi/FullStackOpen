import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Submits blog form that receives proper details', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog}/>
  )

  const form = component.container.querySelector('.formDiv')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Testing the Blog Form' }
  })

  fireEvent.change(author, {
    target: { value: 'Xavier' }
  })

  fireEvent.change(url, {
    target: { value: 'sometesturl.com' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Testing the Blog Form')

})