import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
const PORT = 3001;

app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
  {
    name: "Maryk Poppendieck",
    number: "439-23-6423122",
    id: "5",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const name = body.name;
  const number = body.number;

  if (!name || !number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  if (persons.find((p) => p.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 1000000).toString(),
  };

  persons = [...persons, newPerson];
  res.json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.get("/api/info", (req, res) => {
  const time = new Date();
  const text = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `;

  res.send(text);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
