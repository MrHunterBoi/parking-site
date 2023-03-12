const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/", (req, res) => {
  db.getDb(req, res);
});

app.put("/api/", (req, res) => {
  db.updateDb(req, res);
});

app.listen(PORT, () =>
  console.log(`Backend app is listening on port ${PORT}!`),
);