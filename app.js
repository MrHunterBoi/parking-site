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

app.post("/api/", (req, res) => {
  db.updateDb(req, res);
});

app.put("/api/slot", (req, res) => {
  db.deleteSlot(req, res);
});

app.post("/api/slot", (req, res) => {
  db.createSlot(req, res);
});

app.put("/api/client", (req, res) => {
  db.changeClient(req, res);
});

app.put("/api/client/date", (req, res) => {
  db.changeClientDate(req, res);
});

app.get("/api/profiles", (req, res) => {
  db.getProfiles(req, res);
});

app.post("/api/profiles", (req, res) => {
  db.createProfile(req, res);
});

app.put("/api/profiles", (req, res) => {
  db.editProfile(req, res);
});

app.delete("/api/profiles", (req, res) => {
  db.deleteProfileBooking(req, res);
});

app.listen(PORT, () =>
  console.log(`Backend app is listening on port ${PORT}!`),
);