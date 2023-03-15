import 'jquery-ui-dist/jquery-ui'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../static/img/slider1.jpg'
import img2 from '../static/img/slider2.jpg'
import img3 from '../static/img/slider3.jpg'
import img4 from '../static/img/slider4.jpg'
import img5 from '../static/img/slider5.jpg'
import classes from "./Slider.module.css";
import {useState} from "react";

function Slider() {
  const [carouselLoaded, setCarouselLoaded] = useState(false);

  function loadCarousel () {
    setCarouselLoaded(true);
  }

  return (
    <OwlCarousel onLoad={loadCarousel} className='owl-theme'
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
      </div>
      <div className={classes.item}>
        <img src={img2} alt={'img2'}/>
      </div>
      <div className={classes.item}>
        <img src={img3} alt={'img3'}/>
      </div>
      <div className={classes.item}>
        <img src={img4} alt={'img4'}/>
      </div>
      <div className={classes.item}>
        <img src={img5} alt={'img5'}/>
      </div>
    </OwlCarousel>
  )
}

export default Slider;