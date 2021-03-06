import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Renders blog title and author, not Url or likes by default', () => {
  const blog = {
    title: 'A test blog',
    author: 'Xavier G',
    url: 'test.someurl.com',
    likes: 3,
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('A test blog Xavier G')
  expect(component.container).not.toHaveTextContent('test.someurl.com')
  expect(component.container).not.toHaveTextContent('Likes 3')
})

test('Renders Url or likes after view button pressed', () => {
  const blog = {
    title: 'A test blog',
    author: 'Xavier G',
    url: 'test.someurl.com',
    likes: 3,
    user: { name: 'Xavier', username: 'root' }
  }

  const component = render(
    <Blog blog={blog} user={ { name: 'Xavier', username: 'root' }}/>
  )

  expect(component.container).not.toHaveTextContent('test.someurl.com')
  expect(component.container).not.toHaveTextContent('Likes 3')

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test.someurl.com')
  expect(component.container).toHaveTextContent('Likes 3')
})


test('Increments blog likes by 2 when clicked twice', () => {
  const blog = {
    title: 'A test blog',
    author: 'Xavier G',
    url: 'test.someurl.com',
    likes: 3,
    user: { name: 'Xavier', username: 'root' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={ { name: 'Xavier', username: 'root' }}
      addLike={mockHandler}/>
  )

  const button1 = component.getByText('View')
  fireEvent.click(button1)

  const button2 = component.getByText('Like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})