import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes of a blog', () => {
    const blog = {
      title: 'This is a blog',
      author: 'J. Doe',
      likes: 15
    }
    const blogComponent = shallow (<SimpleBlog blog={blog} />)

    const infoDiv = blogComponent.find('.info')
    const likesDiv = blogComponent.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking like button twice calls the event handler 2 times', () => {
    const blog = {
      title: 'This is a blog',
      author: 'J. Doe',
      likes: 15
    }
    const mockHandler = jest.fn()

    const blogComponent = shallow (<SimpleBlog blog={blog} onClick={mockHandler}/>)

    const likeButton = blogComponent.find('button')

    likeButton.simulate('click')
    likeButton.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})