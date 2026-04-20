const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person.js");

const PORT = process.env.PORT;
const app = express();

const errorHandler = (req, res, next, error) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  res.status(500).send({ error: "internal server error" });
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(errorHandler);

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (name === undefined || number === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error: "failed to save to database" });
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

  Person.findByIdAndUpdate(id, { name, number }, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  Person.countDocuments({})
    .then((count) => {
      const time = new Date();
      const text = `
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `;

      res.send(text);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
