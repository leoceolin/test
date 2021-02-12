const Hashids = require("hashids");

const express = require("express");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv/config");

const { PORT, JWT_PW } = process.env;
const mongo = require("../config/mongo");
const app = express();

mongo.connectToServer();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
const hashids = new Hashids(
  "",
  6,
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ!@#$%*()|-_=+^/?"
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = mongo.getDb();
  const user = await db.collection("user").findOne({ email, password });
  const token = jwt.sign(user, JWT_PW);
  res.status(200).send({ userData: user, token });
});

app.get("/auth", (req, res) => {
  let token = req.header("Authorization");
  token = token.split(" ")[1];
  const ok = jwt.verify(token, JWT_PW);
  res.status(200).send(ok);
});

app.get("/", (req, res) => {
  res.status(200).send("Gaivota Test");
});

app.get("/challenge/encode/:number", (req, res) => {
  const encodedNumber = hashids.encode(parseInt(req.params.number));

  return res.status(200).send(`Encoded number ${encodedNumber}`);
});

app.get("/challenge/decode/:text", (req, res) => {
  const decodedNumber = hashids.decode(req.params.text);

  return res.json(`Decoded number ${decodedNumber}`);
});

// get all farms
app.get("/farms", async (req, res) => {
  const db = mongo.getDb();
  const farms = await db
    .collection("farms")
    .find({})
    .toArray();

  res.status(200).send({ allFarms: farms });
});

app.listen(PORT !== "undefined" ? PORT : 5000, () => {
  console.warn("App is running at http://localhost:" + PORT);
});

module.exports = app;
