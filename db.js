const {MongoClient} = require("mongodb")

const url = 'mongodb+srv://admin:admin@parkingsite.misafml.mongodb.net/?retryWrites=true&w=majority';

let db;

MongoClient.connect(url)
  .then((client) => {
    db = client.db('Parking');
  })
  .catch(err => {
    console.log(err);
  });

function getDb(req, res) {
  let lots = [];

  db.collection('ParkingSlots')
    .find()
    .forEach((lot) => {
      lots.push(lot);
    })
    .then(() => {
      res.status(200).json(lots);
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't fetch data"})
    })
}

function updateDb(req, res) {
  db.collection('ParkingSlots')
    .updateOne( {location: req.body.location, "places.number": parseInt(req.body.slot)} ,
      { $set: { "places.$.bookedBy" : req.body.name, "places.$.expiresBooking"
            : new Date(new Date().getTime() + req.body.duration * 60 * 60 * 1000).toISOString()} } )
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })
}

module.exports = {getDb, updateDb};