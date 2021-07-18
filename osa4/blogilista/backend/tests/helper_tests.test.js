const listHelper = require('../utils/list_helper')
const blogs = require('./sample_blogs').blogs

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('gets empty list, returns zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('gets list of one blog, returns the likes on that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('gets entire blogs list, returns sum of blog likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(24)
  })
})

describe('favoriteBlog', () => {
  test('gets empty list, returns empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('gets list with one object, returns that one object', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('gets entire blogs list, returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('mostBlogs', () => {
  test('gets empty list, returns empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('gets list with one object, returns that one author', () => {
    const result = listHelper.mostBlogs([blogs[0]])
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('gets entire blogs list, returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('mostLikes', () => {
  test('gets empty list, returns empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('gets list with one object, returns that one author', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('gets entire blogs list, returns the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})