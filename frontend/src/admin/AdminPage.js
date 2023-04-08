import {createContext, useEffect, useState} from "react";
import {getDb, parseLocalProfile} from "../apis/API";
import AdminLocation from "./AdminLocation";
import AdminSlots from "./AdminSlots";
import AdminSlotInfo from "./AdminSlotInfo";
import AdminActions from "./AdminActions";
import classes from "./AdminPage.module.css";
import {useNavigate} from "react-router-dom";

let dbContext = createContext();

function AdminPage() {
  const [render, setRender] = useState(null);
  const [dbData, setDbData] = useState();
  const [profileData, setProfileData] = useState(parseLocalProfile())
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState();
  const [slotInfo, setSlotInfo] = useState(null);
  const navigator = useNavigate();


  async function setDb() {
    await getDb()
      .then(res => {
        if (profileData.perms === 'superadmin') {
          setDbData(res);
          return;
        }
        for (const r of res) {
          if (r.location === profileData.location) {
            setDbData([r]);
            return;
          }
        }
      });
  }


  useEffect(() => {
    if (!profileData) {
      navigator('/login');
      return;
    }
    if (profileData.perms === 'user') {
      navigator('/profile');
      return;
    }

    setDb();
  }, [])

  return (
    <dbContext.Provider value={{
      dbData, setDbData, profileData, selectedOption,
      setSelectedOption, selectedSlot, setSelectedSlot, slotInfo, setSlotInfo
    }}>
      {
        dbData
          ? <main className={classes.main}>
            <AdminLocation/>
            <AdminSlots
            />
            {selectedSlot
              ? <><AdminSlotInfo
                render={render}
              />
                <AdminActions
                  setRender={setRender}
                />
              </>
              : <></>}
          </main>
          : <></>
      }
    </dbContext.Provider>
  )
}

export {dbContext};
export default AdminPage;