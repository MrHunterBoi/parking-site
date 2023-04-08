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
  const end = new Date(new Date().getTime() + req.body.duration * 60 * 60 * 1000).toISOString();

  db.collection('ParkingProfiles')
    .updateOne({"email": req.body.email},
      {
        $push: {
          "bookings": {
            "location": req.body.location,
            "slot": req.body.slot,
            "end": end
          }
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't delete data"})
    })

  db.collection('ParkingSlots')
    .updateOne({location: req.body.location, "places.number": parseInt(req.body.slot)},
      {
        $set: {
          "places.$.bookedBy": req.body.name,
          "places.$.expiresBooking": end,
          "places.$.email": req.body.email
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })
}

function createSlot(req, res) {
  db.collection('ParkingSlots')
    .updateOne({location: req.body.location},
      {
        $push: {
          "places": {
            "number": req.body.slot,
            "expiresBooking": "",
            "bookedBy": "",
            "email": ""
          }
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't create data"})
    })
}

function deleteSlot(req, res) {
  const data = req.body;
  console.log(data)

  db.collection('ParkingProfiles')
    .updateMany({},
      {
        $pull: {
          "bookings": {
            "location": data.location,
            "slot": data.slot.toString(),
          }
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't delete data"})
    })

  db.collection('ParkingSlots')
    .updateOne({location: data.location},
      {
        $pull: {
          "places": {
            "number": data.slot
          }
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't delete data"})
    })
}

function changeClient(req, res) {
  db.collection('ParkingProfiles')
    .updateOne({"email": req.body.newEmail},
      {
        $push: {
          "bookings": {
            "location": req.body.location,
            "slot": req.body.slot,
            "end": req.body.expiresBooking
          }
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })

  db.collection('ParkingProfiles')
    .updateOne({"email": req.body.oldEmail},
      {
        $pull: {
          "bookings": {
            "location": req.body.location,
            "slot": req.body.slot
          }
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })

  db.collection('ParkingSlots')
    .updateOne({location: req.body.location, "places.number": parseInt(req.body.slot)},
      {
        $set: {
          "places.$.bookedBy": req.body.bookedBy,
          "places.$.expiresBooking": req.body.expiresBooking,
          "places.$.email": req.body.newEmail
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })
}

function changeClientDate(req, res) {
  db.collection('ParkingProfiles')
    .updateOne({"email": req.body.email, "bookings.location": req.body.location, "bookings.slot": req.body.slot},
      {
        $set: {
          "bookings.$.end": req.body.expiresBooking
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })

  db.collection('ParkingSlots')
    .updateOne({location: req.body.location, "places.number": parseInt(req.body.slot)},
      {
        $set: {
          "places.$.expiresBooking": req.body.expiresBooking
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })
}

function getProfiles(req, res) {
  let profiles = [];

  db.collection('ParkingProfiles')
    .find()
    .forEach((profile) => {
      profiles.push(profile);
    })
    .then(() => {
      res.status(200).json(profiles);
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't fetch data"})
    })
}

function createProfile(req, res) {
  const data = {
    email: req.body.email,
    password: req.body.password,
    perms: 'user',
    location: '',
    bookings: []
  }

  db.collection('ParkingProfiles')
    .insertOne(data)
    .then(() => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't create data"})
    })
}

function editProfile(req, res) {
  const data = req.body;
  db.collection('ParkingProfiles')
    .updateOne({"email": data.email},
      {
        $set: {
          "email": data.email,
          "password": data.password,
          "bookings": data.bookings
        }
      })
    .then(() => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't update data"})
    })
}

function deleteProfileBooking(req, res) {
  const data = req.body;

  db.collection('ParkingProfiles')
    .updateOne({"email": data.email},
      {
        $pull: {
          "bookings": {
            "location": data.bookings[data.bookingIndex].location,
            "slot": data.bookings[data.bookingIndex].slot,
          }
        }
      })
    .catch(() => {
      res.status(500).json({error: "Couldn't delete data"})
    })

  db.collection('ParkingSlots')
    .updateOne({
        location: data.bookings[data.bookingIndex].location,
        "places.number": parseInt(data.bookings[data.bookingIndex].slot)
      },
      {
        $set: {
          "places.$.bookedBy": '',
          "places.$.expiresBooking": '',
          "places.$.email": ''
        }
      })
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({error: "Couldn't delete data"})
    })
}

module.exports = {
  getDb, updateDb, getProfiles, createProfile, editProfile,
  deleteProfileBooking, changeClient, changeClientDate, deleteSlot, createSlot
};