import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  let blogComponent
  let blog
  let mockLikeHandler
  let mockDeleteHandler

  beforeEach(() => {
    blog = {
      title: 'This is a blog',
      author: 'J. Doe',
      url: 'http://bestblog.com/',
      likes: 10,
      user: { name: 'J. Adder' }
    }

    mockLikeHandler = jest.fn()
    mockDeleteHandler = jest.fn()

    blogComponent = shallow (
      <Blog
        blog={blog}
        like={mockLikeHandler}
        delete={mockDeleteHandler}
        loggedUser={'admin'}
      />
    )
  })

  it('displays only title and author of a blog by default', () => {
    const content = blogComponent.find('.content')

    expect(content.text()).toContain(blog.title)
    expect(content.text()).toContain(blog.author)
    expect(content.text()).not.toContain(blog.url)
    expect(content.text()).not.toContain(blog.likes)
    expect(content.text()).not.toContain(blog.user.name)
  })

  it('displays details after clicking title', () => {
    const contentBeforeClick = blogComponent.find('.content')
    contentBeforeClick.simulate('click')

    const contentAfterClick = blogComponent.find('.content')

    expect(contentAfterClick.text()).toContain(blog.title)
    expect(contentAfterClick.text()).toContain(blog.author)
    expect(contentAfterClick.text()).toContain(blog.url)
    expect(contentAfterClick.text()).toContain(blog.likes)
    expect(contentAfterClick.text()).toContain(blog.user.name)
  })


})