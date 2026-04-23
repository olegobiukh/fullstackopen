const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const cors = require("cors");
const { MONGODB_URI, PORT } = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const app = express();

mongoose
  .connect(MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

  app.use(cors());
  app.use(express.json());
  app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
// app.use(express.static("dist"));

module.exports = app;
