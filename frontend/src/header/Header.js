import {Link, useNavigate} from "react-router-dom";
import classes from "./Header.module.css";
import parkingLogo from "../static/img/parkingLogo.png"
import hClasses from "./Header.module.css";
import {useEffect, useState} from "react";
import {parseLocalProfile} from "../apis/API";

function Header() {
  const [profileData, setProfileData] = useState(parseLocalProfile())
  const navigator = useNavigate();

  function handleLogOut() {
    localStorage.clear();
    setProfileData(null)
    navigator('/');
  }

  useEffect(() => {
    setProfileData(parseLocalProfile());
  }, [navigator])

  return (
    <header className={`${classes.header}`}>
      <nav className={classes.nav}>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link}`}
              to={'/'}>Головна</Link>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link} `}
              to={'/booking'}>Забронювати місце</Link>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link} `}
              to={'/profile'}>Персональний кабінет</Link>
        {profileData
          ? profileData.perms === 'admin' || profileData.perms === 'superadmin'
            ? <><Link className={`btn-outline px-4 py-3 rounded-4 ${hClasses.btnOrange} ${hClasses.link} `}
                      to={'/admin'}>Адміністративна сторінка</Link>
              <button onClick={handleLogOut}
                      className={`btn-outline px-4 py-3 rounded-4 ${hClasses.btnOrange} ${hClasses.link} `}
              >Вийти
              </button>
            </>
            : <button onClick={handleLogOut}
                      className={`btn-outline px-4 py-3 rounded-4 ${hClasses.btnOrange} ${hClasses.link} `}
            >Вийти</button>
          : <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link} `}
                  to={'/login'}>Увійти</Link>}
      </nav>
      <div className={classes.company}>
        <Link className={`text-dark`} to={'/'}><h2>Anosrep</h2></Link>
        <Link className={classes.linkLogo} to={'/'}><img src={parkingLogo} className={classes.logo}
                                                         alt={'ParkingLogo.png'}/></Link>
      </div>
    </header>
  )
}

export default Header;
