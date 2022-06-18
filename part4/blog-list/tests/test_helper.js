const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'Hellas123',
  },
  {
    username: 'mluukkai',
    name: 'Matti Lukkainen',
    password: 'LukImUrFather',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}
