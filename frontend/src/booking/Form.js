import {useState} from "react";
import classes from "./Form.module.css";

function Form() {
  const dummy_data = [
    {
      location: 'вул. Наукова 26',
      places: [
        {
          number: 1,
          expiresBooking: "2023-03-07",
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
      location: 'вул. І. Франка 22',
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
      location: 'пр. Шевченка 42',
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

  const handleChangeIndex = (e) => {
    setOptionIndex(e.target.value);
    document.getElementById(radioId).checked = false;
  }

  const handleRadio = e => {
    setRadioId(e.target.id);
  }

  const handleDisabledRadio = date => {
    return new Date().getTime() - new Date(date).getTime() <= 0;
  }

  return (
    <form className={`form-check ${classes.form}`}>
      <label htmlFor={"name"} key={"nameLabel"}>Ваше ім'я та прізвище</label>
      <input type={"text"} id={"name"} key={"name"} className={"form-check-input"} required/>
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
      <input type={"number"} id={"hours"} key={"hours"} className={"form-check-input"} required/>
    </form>
  )
}

export default Form;