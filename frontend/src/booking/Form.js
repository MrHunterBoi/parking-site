import {useState} from "react";
import classes from "./Form.module.css";

function Form() {
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

  const [optionIndex, setOptionIndex] = useState(0);
  const [radioId, setRadioId] = useState();

  const handleChangeIndex = e => {
    setOptionIndex(e.target.value);
    document.getElementById(radioId).checked = false;
  }

  const handleRadio = e => {
    setRadioId(e.target.id);
  }

  const handleDisabledRadio = date => {
    return new Date().getTime() - new Date(date).getTime() <= 0;
  }

  const handleBookingDuration = e => {
    const val = parseInt(e.target.value);
    const max = parseInt(e.target.max);
    const min = parseInt(e.target.min);
    
    if (val > max) e.target.value = max;
    if (val < min) e.target.value = min;
  }

  return (
    <form className={`${classes.form}`}>
      <div className={"input-group mb-3"}>
        <label className={"input-group-text"} htmlFor={"name"} key={"nameLabel"}>Ваші ініціали</label>
        <input type={"text"} id={"name"} key={"name"} className={"form-control"} required/>
      </div>
      <select className="form-select" onChange={handleChangeIndex} key={"select"}>
        {dummy_data.map((item, index) =>
          <option value={index} key={`option${index}`}>{item.location}</option>
        )}
      </select>
      <div className={classes.radios}>
        {dummy_data[optionIndex].places.map((item, index) =>
          <div>
            <input disabled={handleDisabledRadio(item.expiresBooking)} onClick={handleRadio}
                   className={`form-check-input btn-check ${classes.radio}`} type="radio" name="slot"
                   key={`radio${index}`} id={item.number} required/>
            <label htmlFor={item.number} key={`radioLabel${index}`}
                   className={`px-2 py-1 rounded-2 ${classes.btnOrange} ${classes.radio} 
                   ${handleDisabledRadio(item.expiresBooking) ? classes.btnGray : ''}`}>{item.number}</label>
          </div>
        )}
      </div>
      <div className={"input-group mb-3"}>
        <label className={"input-group-text"} htmlFor={"hours"} key={"hoursLabel"}>Тривалість бронювання<br/> (1 - 120 год)</label>
        <input onChange={handleBookingDuration} min={1} max={120} type={"number"} id={"hours"} key={"hours"} className={"form-control"} required/>
      </div>
      <button type="submit" className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.submit}`}>Забронювати!</button>
    </form>
  )
}

export default Form;