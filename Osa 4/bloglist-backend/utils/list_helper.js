const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce(((sum, blog) => sum + blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(((favorite, blog) => blog.likes > favorite.likes ? blog : favorite), blogs[0]) 
}

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = blogs.reduce(((authors, blog) => {
    const author = authors.find(a => a.author === blog.author)
    if (!author) {
      authors.push({
        author: blog.author,
        blogs: 1
      })
    } else {
      author.blogs += 1
    }
    return authors
  }), [])
    .reduce((most, author) => author.blogs > most.blogs ? author : most)

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authorWithMostLikes = blogs.reduce(((authors, blog) => {
    const author = authors.find(a => a.author === blog.author)
    if (!author) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    } else {
      author.likes += blog.likes
    }
    return authors
  }), [])
    .reduce((most, author) => author.likes > most.likes ? author : most)

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}