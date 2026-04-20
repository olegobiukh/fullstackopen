## 🚀 Live Application
The API is deployed and accessible at:
**[https://render-test-w7i4.onrender.com/](https://render-test-w7i4.onrender.com/)**

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