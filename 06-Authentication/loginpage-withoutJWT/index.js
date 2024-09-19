const express = require("express");
const app = express();
app.use(express.json());

const users = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

function signUpHandler(req, res) {
  // no input validations yet
  //   const username = req.body.username;
  //   const password = req.body.password;
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
    const token = generateToken();
    foundUser.token = token;
    res.json({ token: token });
  } else {
    res.status(404).send({
      message: "Invalid username or password",
    });
  }
}

function MeHandler(req, res) {
  const token = req.headers.token;
  const user = users.find((u) => {
    u.token === token;
  });
  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

app.post("/signup", signUpHandler);

app.post("/signin", signInHandler);

app.get("/me", MeHandler);

app.listen(3000);
