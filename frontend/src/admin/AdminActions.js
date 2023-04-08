import {useContext, useState} from "react";
import {dbContext} from "./AdminPage";
import classes from './AdminActions.module.css'
import pClasses from '../profile/BookingInfo.module.css'
import {changeClient, changeClientDate, deleteProfileBooking, getProfiles} from "../apis/API";
import lClasses from "../login/LoginForm.module.css";

function AdminActions(props) {
  const contextDb = useContext(dbContext);
  let lots = contextDb.dbData;
  const [errMsg, setErrMsg] = useState('');


  function handleDelete() {
    props.setRender('');

    const data = {
      email: lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].email,
      bookingIndex: 0,
      bookings: [
        {
          location: lots[contextDb.selectedOption].location,
          slot: contextDb.selectedSlot
        }
      ]
    }

    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].expiresBooking = '';
    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].bookedBy = '';
    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].email = '';

    contextDb.setDbData(lots);

    deleteProfileBooking(data);
  }

  function handleEditDate(e) {
    e.preventDefault();

    props.setRender(e.target.date.value)
    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].expiresBooking = e.target.date.value;
    contextDb.setDbData(lots);

    const data = {
      email: lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].email,
      location: lots[contextDb.selectedOption].location,
      expiresBooking: lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].expiresBooking,
      slot: contextDb.selectedSlot
    }

    changeClientDate(data)
  }

  function handleEditClient(e) {
    e.preventDefault();
    const data = {
      oldEmail: lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].email,
      newEmail: e.target.email.value,
      bookedBy: e.target.alias.value,
      location: lots[contextDb.selectedOption].location,
      expiresBooking: lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].expiresBooking,
      slot: contextDb.selectedSlot
    }

    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].email = e.target.email.value;
    lots[contextDb.selectedOption].places[contextDb.selectedSlot - 1].bookedBy = e.target.alias.value;
    contextDb.setDbData(lots);

    getProfiles()
      .then((res) => {
        for (const r of res) {
          if (r.email === data.newEmail) {
            setErrMsg('')
            changeClient(data);
            props.setRender(e.target.email.value);
            return;
          }
        }
        setErrMsg('Не знайдено користувача з такою поштою')
      })
  }

  return (
    <div className={classes.container}>
      <h2>Дії</h2>
      <button onClick={handleDelete}
              className={`btn-outline px-4 py-3 rounded-4 ${pClasses.btnRed} ${classes.btn}`}>Скасувати бронювання
      </button>
      <form onSubmit={handleEditDate} className={classes.dateForm}>
        <input min={new Date(new Date().getTime() + 1000 * 60 * 60 * 3).toISOString().slice(0, -8)} required
               max={new Date(new Date().getTime() + 1000 * 60 * 60 * (24 * 14 + 3)).toISOString().slice(0, -8)}
               className={'rounded-3'} name={'date'} id={'date'} type={"datetime-local"}/>
        <button type={'submit'}
                className={`btn-outline px-4 py-3 rounded-4 ${classes.btnBlue} ${classes.btn}`}>Перенести дату кінця
          бронювання
        </button>
      </form>
      <form onSubmit={handleEditClient} className={classes.clientForm}>
        <div>
          <label htmlFor={'email'}>Електронна пошта</label>
          <input required className={"form-control"} name={'email'} id={'email'} type={"email"}/>
          <label htmlFor={'alias'}>Ініціали</label>
          <input required className={"form-control"} name={'alias'} id={'alias'} type={"text"}/>
        </div>
        <button type={'submit'} className={`btn-outline px-4 py-3 rounded-4 ${classes.btnBlue} ${classes.btn}`}>Змінити
          власника бронювання
        </button>
      </form>
      {errMsg ? <p className={lClasses.error}>{errMsg}</p> : <></>}
    </div>
  )
}

export default AdminActions;