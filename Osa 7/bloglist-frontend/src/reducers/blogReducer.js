import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return state.map(b => b.id === action.blog.id ? { ...action.blog, user: b.user } : b)
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.id)
    case 'ADD_COMMENT': {
      const blog = action.data
      return state.map(b => b.id === blog.id ? { ...blog, user: b.user } : b)
    }
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title: blog.title,
      author: blog.author,
      url: blog.url
    })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      blog: likedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteId(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.addComment(id, { comment })
    dispatch({
      type: 'ADD_COMMENT',
      data: blog
    })
  }
}

export default blogReducer