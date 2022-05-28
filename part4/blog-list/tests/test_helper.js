const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: '3 Quarks Daily',
    author: 'S. Abbas Raza',
    url: 'www.3quarksdaily.com',
    likes: 26,
  },
  {
    title: 'Airline Reporter',
    author: 'David Parker Brown',
    url: 'www.airlinereporter.com',
    likes: 65,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
