import {useState, useContext, useEffect} from "react";
import {contextDb} from "./Booking"
import classes from "./Form.module.css";
import {updateDb} from "../apis/API";

function Form() {
  const context = useContext(contextDb);
  const profileData = context.profileData;

  useEffect(() => {
    context.setCenter({
      lat: context.dbData[context.optionIndex].lat,
      lng: context.dbData[context.optionIndex].lng
    })
  }, [context.optionIndex])

  const [radioId, setRadioId] = useState();

  const handleChangeIndex = e => {
    context.setOptionIndex(e.target.value);
    if (radioId) document.getElementById(radioId).checked = false;
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

  const handleSubmit = e => {
    e.preventDefault();

    let checked;
    for (const s of e.target.slot) {
      if (s.checked) {
        checked = s;
        break;
      }
    }

    const data = {
      id: profileData._id,
      name: e.target.name.value,
      location: e.target.street.options[e.target.street.selectedIndex].text,
      slot: checked.id,
      duration: e.target.hours.value,
      email: profileData.email
    }

    updateDb(data)
      .then(res => {
        context.setShowingDialog({
          isShowing: true,
          text: res
        });
      });
  }

  return (
    <form className={`${classes.form}`} onSubmit={handleSubmit}>
      <div className={"input-group mb-3"}>
        <label className={"input-group-text"} htmlFor={"name"} key={"nameLabel"}>Ваші ініціали</label>
        <input type={"text"} id={"name"} key={"name"} className={"form-control"} required/>
      </div>
      <select id={"street"} value={context.optionIndex} className={`form-select`} onChange={handleChangeIndex}
              key={"street"}>
        {context.dbData.map((item, index) =>
          <option value={index} key={`${index}`}>{item.location}</option>
        )}
      </select>
      <div className={classes.radios}>
        {context.dbData[context.optionIndex].places.map((item) =>
          <div key={item.number+'div'}>
            <input disabled={handleDisabledRadio(item.expiresBooking)} onClick={handleRadio}
                   className={`form-check-input btn-check ${classes.radio}`} type="radio" name="slot"
                   key={item.number} id={item.number} required/>
            <label htmlFor={item.number} key={item.number+'label'}
                   className={`px-2 py-1 rounded-2 ${classes.btnOrange} ${classes.radio} 
                   ${handleDisabledRadio(item.expiresBooking) ? classes.btnGray : ''}`}>{item.number}</label>
          </div>
        )}
      </div>
      <div className={"input-group mb-3"}>
        <label className={"input-group-text"} htmlFor={"hours"} key={"hoursLabel"}>Тривалість бронювання<br/> (1 - 120
          год)</label>
        <input onChange={handleBookingDuration} min={1} max={120} type={"number"} id={"hours"} key={"hours"}
               className={"form-control"} required/>
      </div>
      <button type="submit"
              className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.submit}`}>Забронювати!
      </button>
    </form>
  )
}

export default Form;