import classes from './ProfileBookings.module.css'
import {useState, useEffect} from "react";
import {useContext} from "react";
import BookingInfo from "./BookingInfo";
import {contextProfile} from "./ProfilePage";
import {editProfile, setLocalProfile} from "../apis/API";

function ProfileBookings() {
  const context = useContext(contextProfile)
  const [time, setTime] = useState(new Date().getTime());
  let filteredBookings;

  useEffect(() => {
    filteredBookings = context.profileData.bookings.filter(item => new Date(item.end).getTime() - time > 0);
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000)
  }, [])

  useEffect(() => {
    if (filteredBookings.length !== context.profileData.bookings.length) {
      context.profileData.bookings = filteredBookings;
      setLocalProfile(context.profileData);
      editProfile(context.profileData);
    }
  }, [filteredBookings])

  return (
    <div className={classes.bookingsContainer}>
      <h2>Перелік бронювань</h2>
      <section>
        {context.profileData.bookings.length === 0 ?
          <p>У вас немає жодних бронювань! :(</p> : context.profileData.bookings.map((item, index) => {
              if (new Date(item.end).getTime() - time > 0) return <BookingInfo key={index} data={item} time={time} index={index}/>
              else return <></>
            }
          )}
      </section>
    </div>
  )
}

export default ProfileBookings;