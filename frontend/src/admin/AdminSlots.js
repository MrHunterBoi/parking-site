import {useContext, useEffect, useState} from "react";
import {dbContext} from "./AdminPage";
import fClasses from '../booking/Form.module.css'
import classes from './AdminSlots.module.css'
import aClasses from './AdminActions.module.css'
import pClasses from '../profile/BookingInfo.module.css'
import {createSlot, deleteSlot, getDb} from "../apis/API";

function AdminSlots() {
  const contextDb = useContext(dbContext);
  const [render, setRender] = useState(false);

  const handleChange = (e) => {
    contextDb.setSelectedSlot(e.target.id);
  }

  useEffect(() => {
    setRender(false);
  }, [render])

  function handleAdd() {
    getDb()
      .then(res => {
        for (const r of res) {
          if (r.location === contextDb.dbData[contextDb.selectedOption].location) {
            return r.places.length + 1;
          }
        }
      }).then(r => {
      const data = {
        location: contextDb.dbData[contextDb.selectedOption].location,
        slot: r
      };
      createSlot(data);
      setRender(true);

      contextDb.dbData[contextDb.selectedOption].places.push({
        number: data.slot,
        expiresBooking: "",
        bookedBy: "",
        email: ""
      })
    })
  }

  function handleDelete() {
    getDb()
      .then(res => {
        for (const r of res) {
          if (r.location === contextDb.dbData[contextDb.selectedOption].location) {
            return r.places.length;
          }
        }
      }).then(r => {
      const data = {
        location: contextDb.dbData[contextDb.selectedOption].location,
        slot: r
      };
      deleteSlot(data);
      setRender(true);
      if (r.toString() === contextDb.selectedSlot) contextDb.setSelectedSlot(null);

      contextDb.dbData[contextDb.selectedOption].places.pop()
    })
  }

  return (
    <div>
      <h2>Паркувальні місця стоянки</h2>
      {contextDb.selectedOption !== undefined ?
        <div>
          <div className={fClasses.radios}>
            {contextDb.dbData[contextDb.selectedOption].places.map((item) =>
              <div key={item.number}>
                <input className={`form-check-input btn-check ${fClasses.radio}`} onClick={handleChange} type="radio"
                       name="slot"
                       key={item.number} id={item.number} required/>
                <label htmlFor={item.number} key={item.number + 'label'}
                       className={`px-2 py-1 rounded-2 ${fClasses.btnOrange} ${fClasses.radio}`}>{item.number}</label>
              </div>
            )}
          </div>
          <div className={classes.buttons}>
            <button onClick={handleAdd}
                    className={`btn-outline px-3 py-1 rounded-4 ${aClasses.btnBlue} ${fClasses.btnOrange} ${fClasses.submit}`}>+
            </button>
            <button onClick={handleDelete}
                    className={`btn-outline px-3 py-1 rounded-4 ${pClasses.btnRed} ${fClasses.btnOrange} ${fClasses.submit}`}>-
            </button>
          </div>
        </div>
        : <p>Завантаження...</p>}
    </div>
  )
}

export default AdminSlots;