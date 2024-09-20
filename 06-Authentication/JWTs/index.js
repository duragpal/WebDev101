const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const JWT_SECRET = "qwertyasdf";
//JWT's are stateless so need not to be stored in DB
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
  const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = decodedInfo.username;
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

app.post("/signup", signUpHandler);

app.post("/signin", signInHandler);

app.get("/me", MeHandler);

app.listen(3000);
