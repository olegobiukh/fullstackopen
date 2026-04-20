# Full Stack Phonebook
This repository contains both the frontend and the backend for the Phonebook application.

## 🚀 Live Demo
The application is deployed on Render at:
**[https://render-test-w7i4.onrender.com/](https://render-test-w7i4.onrender.com/)**

## 📂 Project Structure
- `backend/`: Node.js/Express backend.
- `frontend/`: React/Vite frontend source code.
- `backend/dist/`: The production build of the frontend, served staticly by the backend.

## 🛠 Features
- **GET /api/persons**: Fetch all phonebook entries.
- **GET /info**: See the count of entries and the current server time.
- **GET /api/persons/:id**: Fetch a single entry by ID.
- **DELETE /api/persons/:id**: Remove an entry.
- **POST /api/persons**: Add a new entry (validates unique name and presence of number).

🛠 Tech Stack
Node.js: JavaScript runtime environment.
Express: Web framework for building the API.
Morgan: HTTP request logger middleware.
CORS: Middleware to allow cross-origin requests.

## 🛠 Deployment Notes
- The frontend was built using `npm run build`.
- The resulting `dist` folder was moved to the backend root.
- The backend uses `app.use(express.static('dist'))` to serve the UI.