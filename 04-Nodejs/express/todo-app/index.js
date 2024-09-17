const express = require("express");

const app = express();
const todos = [];
app.post("/", (req, res) => {
  //extract the title of todos from body
  todos.push({ title, id });
});
app.delete("/", (req, res) => {
  //extract todoid
  //remove todoid
});
app.get("/", (req, res) => {
  res.json({ todos });
});
