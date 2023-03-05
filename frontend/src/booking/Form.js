import {useState, useContext} from "react";
import {contextDb} from "./Booking"
import classes from "./Form.module.css";

function Form() {
  const dummy_data = useContext(contextDb)

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