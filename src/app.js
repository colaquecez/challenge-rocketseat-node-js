const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  return response.send(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const findIdex = repositories.findIndex((item) => item.id === id);

  if (findIdex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }

  const repositorie = {
    id,
    url,
    title,
    techs,
    likes: repositories[findIdex].likes
  };

  repositories[findIdex] = repositorie;

  response.send(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIdex = repositories.findIndex((item) => item.id === id);

  if (findIdex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }

  repositories.splice(findIdex, 1);
  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const findIdex = repositories.findIndex((item) => item.id === id);
  if (findIdex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }

  repositories[findIdex].likes = repositories[findIdex].likes + 1;

  response.json(repositories[findIdex])
});

module.exports = app;
