const assert = require('node:assert')
const { test, before, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "My first blog 1235",
    author: "Me",
    url: "http://test123.com",
    likes: 9,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

before(async () => {
  if (mongoose.connection.readyState === 0) {
    console.log('Connecting to MongoDB...')
  }
})

beforeEach(async () => {
  try {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  } catch (error) {
    console.error('Error in beforeEach:', error)
  }
})

test.only('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})


