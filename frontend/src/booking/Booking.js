import Form from "./Form";
import Map from "./Map"
import classes from "./Booking.module.css"
import {useState, createContext} from "react";

const dummy_data = [
    {
      location: 'пл. Підкови 1',
      lat: 49.841370949898156,
      lng: 24.029113667068632,
      places: [
        {
          number: 1,
          expiresBooking: "2023-03-07",
          bookedBy: 'Амеба'
        },
        {
          number: 2,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 3,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 4,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 5,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 6,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 7,
          expiresBooking: 0,
          bookedBy: ''
        },
      ]
    },
    {
      location: 'пл. Міцкевича 10',
      lat: 49.83970487778201,
      lng: 24.030183319441157,
      places: [
        {
          number: 1,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 2,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 3,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 4,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 5,
          expiresBooking: 0,
          bookedBy: ''
        },
      ]
    },
    {
      location: 'вул. Володимира Короленка 9',
      lat: 49.84103092327188,
      lng: 24.039713709239074,
      places: [
        {
          number: 1,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 2,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 3,
          expiresBooking: 0,
          bookedBy: ''
        },
        {
          number: 4,
          expiresBooking: 0,
          bookedBy: ''
        },
      ]
    },
  ]

let contextDb = createContext();

function Booking() {
  const [dbData, setDbData] = useState(dummy_data)


  return (
    <main className={classes.main}>
      <h1>Бронювання паркувального місця</h1>
      <contextDb.Provider value={dbData}>
        <div className={classes.booking}>
          <Form/>
          <Map />
        </div>
      </contextDb.Provider>
    </main>
  )
}

export {contextDb}
export default Booking;