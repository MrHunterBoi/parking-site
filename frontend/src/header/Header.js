import {Link} from "react-router-dom";
import classes from "./Header.module.css";
import parkingLogo from "../static/img/parkingLogo.png"

function Header() {
  return (
    <header className={`${classes.header}`}>
      <nav className={classes.nav}>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link}`}
              to={'/'}>Головна</Link>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.link} `}
              to={'/booking'}>Забронювати місце</Link>
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