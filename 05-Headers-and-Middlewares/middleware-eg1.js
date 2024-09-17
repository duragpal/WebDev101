//Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const express = require("express");
app = express();
app.use((req, res, next) => {
  console.log("Method is :" + req.method);
  console.log("URL is : " + req.url);
  console.log(new Date());
  next();
});

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
