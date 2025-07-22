import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { todos } from "./data/date.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json()); // para ler JSON no body

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { text, category } = req.body;
  const newTodo = {
    id: Date.now(),
    text,
    category,
    isCompleted: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.patch("/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index].isCompleted = !todos[index].isCompleted;
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
