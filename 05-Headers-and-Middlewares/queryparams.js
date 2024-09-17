const express = require("express");
app = express();
app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({ ans: a + b });
});
app.get("subtract", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({ ans: a - b });
});
app.get("multiply", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({ ans: a * b });
});
app.get("divide", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({ ans: a / b });
});
app.listen(3000);
