import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
