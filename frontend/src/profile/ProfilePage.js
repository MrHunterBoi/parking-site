import ProfileInfo from "./ProfileInfo";
import ProfileBookings from "./ProfileBookings";
import {createContext, useEffect, useState} from "react";
import classes from './ProfilePage.module.css'
import ConfirmBox from "./ConfirmBox";
import {getProfiles, parseLocalProfile, setLocalProfile} from "../apis/API";
import {useNavigate} from "react-router-dom";

let contextProfile = createContext();

function ProfilePage() {
  const [confirmShowing, setConfirmShowing] = useState({
    isShowing: false,
    index: -1
  });

  const navigator = useNavigate();
  const [profileData, setProfileData] = useState(parseLocalProfile())

  useEffect(() => {
    if (!profileData) navigator('/login');

    getProfiles().then(res => {
      for (const r of res) {
        if (r.email === profileData.email) {
          setLocalProfile(r);
          setProfileData(r);
        }
      }
    })
  }, [])

  return (
    <contextProfile.Provider value={{profileData, setProfileData, confirmShowing, setConfirmShowing}}>
      {profileData ?
        <main className={classes.main}>
          {confirmShowing.isShowing ? <ConfirmBox/> : <></>}
          <div className={classes.info}>
            <ProfileInfo/>
          </div>
          <ProfileBookings/>
        </main>
        : <></>
      }
    </contextProfile.Provider>
  )
}

export {contextProfile};
export default ProfilePage;