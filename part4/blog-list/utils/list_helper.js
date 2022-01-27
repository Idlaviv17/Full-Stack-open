const dummy = blogs => {
  blogs = 1
  return blogs
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
}

const favoriteBlog = blogs => {
  switch (blogs.length) {
    case 0:
      return {}
    case 1:
      return {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes,
      }
    default:
      return blogs.reduce(
        (favorite, blog) => {
          return favorite.likes < blog.likes
            ? {
              title: blog.title,
              author: blog.author,
              likes: blog.likes,
            }
            : {
              title: favorite.title,
              author: favorite.author,
              likes: favorite.likes,
            }
        },
        {
          likes: 0,
        }
      )
  }
}

const mostBlogs = blogs => {
  const authors = []

  blogs.forEach(blog => {
    const value = authors.find(author => author.author === blog.author)
    if (value) {
      const index = authors.findIndex(author => author.author === value.author)
      authors[index] = {
        ...authors[index],
        blogs: authors[index].blogs + 1,
      }
    } else {
      authors.push({
        author: blog.author,
        blogs: 1,
      })
    }
  })

  return blogs.length === 0
    ? {}
    : authors.reduce(
      (authorMostBlogs, author) => {
        return authorMostBlogs.blogs < author.blogs
          ? author
          : { ...authorMostBlogs }
      },
      {
        blogs: 0,
      }
    )
}

const mostLikes = blogs => {
  const authors = []

  blogs.forEach(blog => {
    const value = authors.find(author => author.author === blog.author)
    if (value) {
      const index = authors.findIndex(author => author.author === value.author)
      authors[index] = {
        ...authors[index],
        likes: authors[index].likes + blog.likes,
      }
    } else {
      authors.push({
        author: blog.author,
        likes: blog.likes,
      })
    }
  })

  return blogs.length === 0
    ? {}
    : authors.reduce(
      (authorMostLikes, author) => {
        return authorMostLikes.likes < author.likes
          ? author
          : { ...authorMostLikes }
      },
      {
        likes: 0,
      }
    )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
