const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1 })
    
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!(request.token && decodedToken.id)) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!(request.body.title && request.body.url)) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    }

    const addedBlog = await new Blog(newBlog).save()
    user.blogs = user.blogs.concat(addedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(addedBlog))
  } catch (exception) {
    console.log(exception)
    if (exception.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: exception.message })
    }
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!(req.token && decodedToken.id)) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === decodedToken.id){
      await Blog.findByIdAndRemove(req.params.id)
    } else {
      return res.status(403).json({ error: 'user permissions insufficient' })
    }

    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: exception.message })
    }
    res.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body
  const blog = { title, author, url, likes }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(updatedBlog)
  } catch (e) {
    console.log(e)
    return res.status(400).send({ error: 'malformatted id' })
  }
})


module.exports = blogsRouter