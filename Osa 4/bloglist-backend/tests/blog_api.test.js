const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, format, usersInDb } = require('./test_helper')

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
      const blogs = await blogsInDb()

      const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogs.length)

      const returnedBlogs = response.body.map(format)
      blogs.forEach(blog => {
        expect(returnedBlogs).toContainEqual(blog)
      })
    })

    test('a specific blog is within the returned blogs', async () => {
      const blogs = await blogsInDb()
      const blog = initialBlogs[0]

      const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const returnedBlogs = response.body.map(format)

      expect(returnedBlogs).toContainEqual(blog)
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

      const blogsBefore = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      expect(blogsAfter).toContainEqual(newBlog)
    })

    test('a blog without field likes is added with zero likes', async () => {
      const newBlog = {
        title: 'This is a blog with no likes',
        author: 'John Doe',
        url: 'https//:johndoe.com'
      }

      const blogsBefore = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      expect(blogsAfter).toContainEqual({ ...newBlog, likes: 0 })
    })

    test('a blog without title and url is not added and status 400 is returned', async () => {
      const newBlog = {
        author: 'John Doe',
        likes: 42
      }

      const blogsBefore = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })

  describe('DELETE to /api/blogs/:id', () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        title: 'This blog is going to be deleted',
        author: 'Jane Doe',
        url: 'http://blog.com',
        likes: 10
      })

      await addedBlog.save()
    })

    test('deletes a blog and returns statuscode 204', async () => {
      const blogsBefore = await blogsInDb()

      await api
        .delete(`/api/blogs/${addedBlog._id}`)
        .expect(204)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter).not.toContainEqual(format(addedBlog))
      expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    })

    test('returns 400 if id is invalid and does not delete anything', async () => {
      const invalidId = '5bf03c4b2ff7cf11c494fef'
      const blogsBefore = blogsInDb()

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)

      const blogsAfter = blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })

  describe('PUT to /api/blogs/:id', () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        title: 'This blog is going to have more likes',
        author: 'Jane Doe',
        url: 'http://blog.com/likedblog',
        likes: 5
      })

      await addedBlog.save()
    })

    test('updates a blog and returns statuscode 200', async () => {
      const blogsBefore = await blogsInDb()

      const updatedBlog = { 
        title: addedBlog.title,
        author: addedBlog.author,
        url: addedBlog.url,
        likes: 10 
      }

      await api
        .put(`/api/blogs/${addedBlog._id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter).not.toContainEqual(format(addedBlog))
      expect(blogsAfter).toContainEqual(updatedBlog)
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('with invalid id returns statuscode 400', async () => {
      const invalidId = '5bf03c4b2ff7cf11c494fef'
      const blogsBefore = blogsInDb()

      const updatedBlog = { 
        title: addedBlog.title,
        author: addedBlog.author,
        url: addedBlog.url,
        likes: 25
      }

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlog)
        .expect(400)

      const blogsAfter = blogsInDb()

      expect(blogsAfter).not.toContainEqual(updatedBlog)
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })

  describe('when there is initally one user in db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'firstuser', password: 'secret' })
      await user.save()
    })
  
    describe('POST to /api/users', () => {
      test('succeeds with valid username', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          username: 'iamnewuser',
          name: 'John Doe',
          password: 'secretpassword',
          adult: true
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)
  
        const usersAfter = await usersInDb()
  
        expect(usersAfter.length).toBe(usersBefore.length + 1)
        const usernames = usersAfter.map(user => user.username)
        expect(usernames).toContain(newUser.username)
      })
  
      test('fails with proper statuscode and error message if username is duplicate', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          username: 'iamnewuser',
          name: 'J. Doe Again',
          password: 'secretpassword',
          adult: false
        }
  
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  
        expect(result.body).toEqual({ error: 'username must be unique' })
  
        const usersAfter = await usersInDb()
  
        expect(usersAfter.length).toBe(usersBefore.length)
      })

      test('fails with proper statuscode and error message if password is under 3 characters long', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          username: 'iamnewuser',
          name: 'J. Doe Again',
          password: 'no',
          adult: false
        }
  
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  
        expect(result.body).toEqual({ error: 'password must be atleast 3 characters long' })
  
        const usersAfter = await usersInDb()
  
        expect(usersAfter.length).toBe(usersBefore.length)
      })

      test('fails with proper statuscode and error message if password is not given', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          username: "userwithoutpassword",
          name: 'John Doe',
          adult: true
        }
  
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  
        expect(result.body).toEqual({ error: 'user must have username and password' })
  
        const usersAfter = await usersInDb()
  
        expect(usersAfter.length).toBe(usersBefore.length)
      })
  

      test('succeeds with a valid user and sets adult to true if it is not given', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          username: 'iamanothernewuser',
          name: 'J. Doe',
          password: 'secretpassword'
        }
  
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)
  
        const usersAfter = await usersInDb()

        expect(usersAfter.length).toBe(usersBefore.length + 1)
        const usernames = usersAfter.map(user => user.username)
        expect(usernames).toContain(newUser.username)
        expect(result.body.adult).toBe(true)
      })

      test('fails with proper statuscode and error message if username is not given', async () => {
        const usersBefore = await usersInDb()
  
        const newUser = {
          name: 'John Doe',
          password: 'secret',
          adult: true
        }
  
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
  
        expect(result.body).toEqual({ error: 'user must have username and password' })
  
        const usersAfter = await usersInDb()
  
        expect(usersAfter.length).toBe(usersBefore.length)
      })
      
    })
  })

  afterAll(() => {
    server.close()
  })
})