# Blog List Application (Part 4)

This project is a backend application for saving information about interesting blogs. It allows users to track authors, titles, URLs, and upvotes.

## 🛠 Tech Stack
- **Node.js** (v22.3.0+)
- **Express**
- **MongoDB Atlas**
- **Mongoose**
- **Nodemon** (Development)

## 📁 Project Structure (Refactoring 4.2)
The application is organized into several modules to separate concerns:

- `index.js`: The entry point of the application that starts the server.
- `app.js`: Contains the actual application logic, middleware, and database connection.
- `controllers/`: Contains the route handlers (e.g., `blogs.js`).
- `models/`: Contains the Mongoose schema definitions (e.g., `blog.js`).
- `utils/`: Helper modules like `config.js` for environment variables and `logger.js` for console messages.
- `middleware/`: Custom middleware for error handling and request logging.



## 🚀 Getting Started

### 1. Installation
Clone this repository and install dependencies:
```bash
npm install