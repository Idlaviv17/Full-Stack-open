const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await (await api.get('/api/blogs')).body
    const filteredBlogs = blogs.filter(blog => blog.hasOwnProperty('id'))
    expect(filteredBlogs).toBeDefined()
  })

  describe('addition of a new blog post', () => {
    test('successfully creates a new blog post', async () => {
      const newBlog = {
        title: 'Belle de Jour',
        author: 'Brooke Magnanti',
        url: 'belledejour.substack.com',
        likes: 12,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const urls = blogsAtEnd.map(n => n.url)
      expect(urls).toContain('belledejour.substack.com')
    })

    test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlog = {
        title: '1000 Awesome Things',
        author: 'Neil Pasricha',
        url: 'www.1000awesomethings.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogCreated = blogsAtEnd.filter(
        blog => blog.url === 'www.1000awesomethings.com'
      )
      expect(blogCreated[0].likes).toBe(0)
    })

    test('verifies that if the title and url properties are missing from the request data, the backend responds with status 400', async () => {
      const newBlog = {
        author: 'Neil Pasricha',
        likes: 65,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('updating of a blog post', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 77

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)
      expect(updatedBlog[0].likes).toBe(77)
    })
  })

  describe('deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
      expect(blogsAtEnd).not.toContain(blogToDelete)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
