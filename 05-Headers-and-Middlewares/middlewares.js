const express = require("express");
app = express();

let requests = 0;

// app.use -> global middlewares. all handlers after that will use that middleware

function requestHandler(req, res, next) {
  requests = requests + 1;
  console.log("Number of Requests : " + requests);
  next();
}

function SumHandler(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ ans: a + b });
}
app.get("/sum", SumHandler);
function SumHandler(req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ ans: a + b });
}
app.listen(3000);
