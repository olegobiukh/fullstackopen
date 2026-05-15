const assert = require("node:assert");
const { test, before, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

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
  },
];

before(async () => {
  if (mongoose.connection.readyState === 0) {
    console.log("Connecting to MongoDB...");
  }
});

beforeEach(async () => {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  } catch (error) {
    console.error("Error in beforeEach:", error);
  }
});

test.only("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test.only("unique identifier id", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blog1 = response.body[0];
  assert.ok(blog1.id);
  assert.strictEqual(blog1._id, undefined);
});

test.only("a valid blog can be added", async () => {
  const newBlog = {
    title: "Async/Await is awesome",
    author: "Full Stack Open",
    url: "https://fullstackopen.com/",
    likes: 25,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  const titles = response.body.map((b) => b.title);
  assert.ok(titles.includes("Async/Await is awesome"));
});

test.only("A blog with no 'likes' property defaults to 0", async () => {
  const newBlog = {
    title: "OMIT: blog without likes",
    author: "without likes",
    url: "https://fullstackopen.com/",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  const addedBlog = response.body.find(
    (b) => b.title === "OMIT: blog without likes",
  );
  assert.strictEqual(addedBlog.likes, 0);
});

test.only("TEST CASE 1: Blog without 'title' returns 400 Bad Request", async () => {
  const newBlog = {
    author: "without title",
    url: "https://fullstackopen.title.com/",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});
test.only("TEST CASE 2: Blog without 'url' returns 400 Bad Request", async () => {
  const newBlog = {
    title: "Blog without url",
    author: "Author: without url",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

describe("Blog API Tests", () => {
  test("Delete", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToDelete = blogsAtStart.body[0]
    
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    
    const blogsAtEnd = await api.get("/api/blogs");
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1);
    const contents = blogsAtEnd.body.map((r) => r.title);
    assert.ok(!contents.includes(blogToDelete.title));
  });
});

after(async () => {
  await mongoose.connection.close();
});
