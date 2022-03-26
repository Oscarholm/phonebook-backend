const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

app.use(express.json());

morgan.token("content", (request, response) => {
  const body = JSON.stringify(request.body);
  return body;
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const count = persons.length;
  date = new Date();
  response.send(`
  <p>Phonebook has info for ${count} people</p>
  <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((person) => person.id !== id);
    console.log(persons);
    response.status(202).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name already exists",
    });
  } else if (persons.find((person) => person.number === body.number)) {
    return response.status(400).json({
      error: "number already exists",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name already exists",
    });
  }

  const person = {
    id: Math.round(Math.random() * 10000),
    name: body.name,
    number: body.number || "",
  };
  persons = persons.concat(person);
  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
