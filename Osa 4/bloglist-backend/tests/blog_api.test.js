const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]


describe('when there are some blogs initially saved', () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
  })

  describe('with GET to /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body.length).toBe(initialBlogs.length)

      const returnedTitles = response.body.map(blog => blog.title)
      initialBlogs.forEach(blog => {
        expect(returnedTitles).toContain(blog.title)
      })
    })

    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)

      expect(titles).toContain('TDD harms architecture')
    })
  })

  describe('with POST to /api/blogs', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'This is a new blog',
        author: 'John Doe',
        url: 'https://johndoe.com',
        likes: 42
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')

      const titles = response.body.map(b => b.title)

      expect(response.body.length).toBe(initialBlogs.length + 1)
      expect(titles).toContain('This is a new blog')
    })

    test('a blog without field likes is added with zero likes', async () => {
      const newBlog = {
        title: 'This is a blog with no likes',
        author: 'John Doe',
        url: 'https:johndoe.com'
      }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const blogs = response.body.map(b => { 
        return {
          title: b.title,
          likes: b.likes
        } 
      })

      expect(response.body.length).toBe(initialBlogs.length + 2)
      expect(blogs).toContainEqual({
        title: 'This is a blog with no likes',
        likes: 0
      })
    })

    test('a blog without title and url is not added and status 400 is returned', async () => {
      const newBlog = {
        author: 'John Doe',
        likes: 42
      }

      const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      expect(response.body.length).toBe(initialBlogs.length + 2)
    })
  })

  afterAll(() => {
    server.close()
  })
})