import 'jquery-ui-dist/jquery-ui'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../static/img/Herrscher_of_Flamescion_Chibi.webp'
import img2 from '../static/img/Herrscher_of_Sentience_Chibi.webp'
import img3 from '../static/img/Herrscher_of_the_Void_Chibi.webp'
import img4 from '../static/img/Herrscher_of_Truth_Chibi.webp'
import classes from "./Slider.module.css";

function Slider() {

  return (
    <OwlCarousel className='owl-theme'
                 loop
                 center
                 items={3}
                 margin={10}
                 autoplay
                 dots
                 autoplayTimeout={8500}
                 smartSpeed={450}>
      <div className={classes.item}>
        <img src={img1} alt={'img1'}/>
        <p>Shut the fuck up</p>
      </div>
      <div className={classes.item}>
        <img src={img2} alt={'img2'}/>
        <p>No one cares</p>
      </div>
      <div className={classes.item}>
        <img src={img3} alt={'img3'}/>
        <p>Nobody asked</p>
      </div>
      <div className={classes.item}>
        <img src={img4} alt={'img4'}/>
        <p>Fucking retard</p>
      </div>
    </OwlCarousel>
  )
}

export default Slider;