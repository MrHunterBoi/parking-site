import classes from "./BookingInfo.module.css";
import pClasses from "../booking/Form.module.css";
import {contextProfile} from "./ProfilePage";
import {useContext} from "react";

function BookingInfo(props) {
  const context = useContext(contextProfile)

  function getTimer(time) {
    if (!time) return '...'
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.floor(time / 1000 / 60 - hours * 60);
    const seconds = Math.floor(time / 1000 - minutes * 60 - hours * 60 * 60);
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  function handleDelete() {
    context.setConfirmShowing({
      isShowing: true,
      index: props.index
    });
  }

  return (
    <div className={classes.bookingBox}>
      <div>
        <p>Місцезнаходження стоянки: {props.data.location}</p>
        <p>Номер місця: {props.data.slot}</p>
        <p>Бронювання спливає через: {getTimer(new Date(props.data.end).getTime() - props.time)}</p>
      </div>
      <button className={`btn-outline px-4 py-3 rounded-4 
          ${classes.btnRed} ${pClasses.submit}`} onClick={handleDelete}>Скасувати бронювання
      </button>
    </div>
  )
}

export default BookingInfo;