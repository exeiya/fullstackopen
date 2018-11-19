const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  const addedBlog = await new Blog(newBlog).save()

  response.status(201).json(addedBlog)
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