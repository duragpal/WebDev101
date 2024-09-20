const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const JWT_SECRET = "qwertyasdf";

const users = [];

function signUpHandler(req, res) {
  const { username, password } = req.body;

  users.push({ username: username, password: password });
  res.json({ message: "You are signed Up." });
}

function signInHandler(req, res) {
  const { username, password } = req.body;
  const foundUser = users.find((u) => {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });
  if (foundUser) {
    //convert username over to jwt
    const token = jwt.sign({ username: username }, JWT_SECRET);
    foundUser.token = token;
    res.json({ token: token });
  } else {
    res.status(404).send({
      message: "Invalid username or password",
    });
  }
}

function MeHandler(req, res) {
  const token = req.headers.token; //JWT
  // const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = req.username; //modify the req and check same user from auth
  const user = users.find((u) => {
    return u.username === username;
  });
  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({ msg: "You are not logged in." });
  }
}

app.post("/signup", signUpHandler);

app.post("/signin", signInHandler);

app.get("/me", auth, MeHandler);

app.get("/todo", auth, () => {});

app.post("/todo", auth, () => {});

app.delete("/todo", auth, () => {});

app.listen(3000);
