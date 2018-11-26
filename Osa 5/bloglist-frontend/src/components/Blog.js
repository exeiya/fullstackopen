import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  expand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { title, author, url, likes, user } = this.props.blog
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      paddingBottom: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const deleteButton = () => {
      if (user === null || this.props.loggedUser.username === user.username ) {
        return <button onClick={this.props.delete}>delete</button>
      }
      return null
    }

    if (!this.state.expanded) {
      return (
        <div style={blogStyle} onClick={this.expand}>
          {title} {author}
        </div>
      )
    }
    
    return (
      <div style={blogStyle}>
          <div onClick={this.expand}>
            {title} {author} 
          </div>
          <div style={{ marginLeft: '5px', marginTop: '5px' }}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <br />
            {likes} likes <button onClick={this.props.like}>like</button><br />
            added by {user ? user.name : '[user deleted]'} <br/>
            {deleteButton()}
          </div>
      </div>
    )
  }
}

export default Blog