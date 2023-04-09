import icon1 from '../static/footer/icon1.png'
import icon2 from '../static/footer/icon2.png'
import icon3 from '../static/footer/icon3.png'
import icon4 from '../static/footer/icon4.png'
import classes from "./Footer.module.css";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className={`${classes.footer}`}>
      <ul className={classes.links}>
        <Link to={'/about'}><img alt='icon1' src={icon1}></img></Link>
        <Link to={'/about'}><img alt='icon1' src={icon2}></img></Link>
        <Link to={'/about'}><img alt='icon1' src={icon3}></img></Link>
        <Link to={'/about'}><img alt='icon1' src={icon4}></img></Link>
      </ul>
      <p>&copy;2023 Національний університет "Львівська Політехніка". Всі права можливо незахищено</p>
    </footer>
  )
}

export default Footer;