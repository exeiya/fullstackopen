import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreate, handleFormChange, title, author, url }) => (
  <form onSubmit={ handleCreate }>
            <div>
              Title <input type="text" name="title" value={title} onChange={handleFormChange} />
            </div>
            <div>
              Author <input type="text" name="author" value={author} onChange={handleFormChange} />
            </div>
            <div>
              Url <input type="text" name="url" value={url} onChange={handleFormChange} />
            </div>
            <button type="submit">Create</button>
  </form>
)

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm