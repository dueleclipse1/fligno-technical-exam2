import express from "express";
import "dotenv/config";
import axios from "axios";
import cors from "cors";
import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const hour = 3600000;
app.use(
  session({
    key: "user_id",
    secret: "revolution",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: hour,
      maxAge: hour,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "coolpassword1",
  database: "flignoDB",
});

app.post("/register", (req, res) => {
  const user_id = uuidv4();
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (user_id, username, password) VALUES (?,?,?)",
      [user_id, username, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password." });
          }
        });
      } else {
        res.send({ message: "User doesn't exist." });
      }
    }
  );
});

app.get("/api/recipes/v2/:query", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.query}&app_id=${process.env.ID}&app_key=${process.env.KEY}`
    );
    res.json(response.data.hits);
  } catch (e) {
    console.log(e);
  }
});

app.post("/logout", async (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/login')
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
