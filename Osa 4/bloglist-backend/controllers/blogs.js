const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1 })
    
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const users = await User.find({})
  const user = users[0]

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: users[0]._id
  }

  const addedBlog = await new Blog(newBlog).save()
  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()

  response.status(201).json(Blog.format(addedBlog))
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch (exception) {
    console.log(exception)

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