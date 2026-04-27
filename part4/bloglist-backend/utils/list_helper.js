const _ = require("lodash");

// dummy
const dummy = (blogs) => {
  return 1;
};

// totalLike
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return total;
};

// favoriteBlog
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  });
};

// mostBlogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(_.keys(counts), (author) => counts[author]);

  return {
    author: topAuthor,
    blogs: counts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = _.groupBy(blogs, "author");
  const totalLikesByAuthor = _.mapValues(likesByAuthor, (authorBlogs) =>
    _.sumBy(authorBlogs, "likes"),
  );
  const topAuthor = _.maxBy(
    _.keys(totalLikesByAuthor),
    (author) => totalLikesByAuthor[author],
  );

  return {
    author: topAuthor,
    likes: totalLikesByAuthor[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
