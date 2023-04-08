import {useContext, useEffect} from "react";
import {dbContext} from "./AdminPage";
import classes from "./AdminSlotInfo.module.css";

function AdminSlotInfo(props) {
  const contextDb = useContext(dbContext)
  const slot = contextDb.dbData[contextDb.selectedOption].places[contextDb.selectedSlot - 1]

  useEffect(() => {}, [props.render]);

  return (
    <div className={classes.container}>
      <h2>Інформація про паркувальне місце</h2>
      {new Date(slot.expiresBooking) - new Date().getTime() > 0
        ? <>
          <div className={classes.inline}>
            <p>Статус місця: </p>
            <p className={classes.booked}>Заброньоване</p>
          </div>
          <p>Ім'я клієнта: {slot.bookedBy}</p>
          <p>Бронювання спливає: {`${new Date(slot.expiresBooking).toLocaleDateString('uk-UA')} 
          ${new Date(slot.expiresBooking).toLocaleTimeString()}`}</p></>
        : <div className={classes.inline}>
            <p>Статус місця:</p>
            <p className={classes.free}>Вільне</p>
          </div>}
    </div>
  )
}

export default AdminSlotInfo;