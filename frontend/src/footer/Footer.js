import icon1 from '../static/footer/icon1.png'
import icon2 from '../static/footer/icon2.png'
import icon3 from '../static/footer/icon3.png'
import icon4 from '../static/footer/icon4.png'
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={`${classes.footer}`}>
      <ul className={classes.links}>
        <a href="https://www.linkedin.com/"><img alt='icon1' src={icon1}></img></a>
        <a href="https://www.twitter.com/"><img alt='icon2' src={icon2}></img></a>
        <a href="https://www.facebook.com/"><img alt='icon3' src={icon3}></img></a>
        <a href="https://www.pinterest.com/"><img alt='icon4' src={icon4}></img></a>
      </ul>
      <p>&copy;2023 Національний університет "Львівська Політехніка". Всі права можливо незахищено</p>
    </footer>
  )
}

export default Footer;