import Form from "./Form";
import Map from "./Map"
import classes from "./Booking.module.css"
import {useState, createContext, useEffect} from "react";
import {getDb} from "../apis/API";
import DialogBox from "./DialogBox";

let contextDb = createContext();

function Booking() {
  const [dbData, setDbData] = useState();

  const [center, setCenter] = useState({
    lat: 49.840240462918584,
    lng: 24.03336064237039,
  }, []);

  const [showingDialog, setShowingDialog] = useState({
    isShowing: false,
    text: ''
  });

  const [optionIndex, setOptionIndex] = useState(0, []);

  async function setDb() {
    await getDb()
      .then(res => {
        setDbData(res);
      });
  }

  useEffect(() => {
    setDb();
  }, [])

  return (
    <contextDb.Provider
      value={{dbData, setDbData, center, setCenter, optionIndex, setOptionIndex, showingDialog, setShowingDialog}}>
      <main className={classes.main}>
        {showingDialog.isShowing ? <DialogBox/> : <></>}
        <h1>Бронювання паркувального місця</h1>

        <div className={classes.booking}>
          {dbData ? <><Form/><Map/></> : <p>Завантаження...</p>}
        </div>
      </main>
    </contextDb.Provider>
  )
}

export {contextDb}
export default Booking;