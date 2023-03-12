import classes from "./Home.module.css";
import button from "../header/Header.module.css"
import Slider from "./Slider";
import img1 from '../static/img/Herrscher_of_Truth_Chibi.webp';
import img2 from '../static/img/Herrscher_of_the_Void_Chibi.webp';
import img3 from '../static/img/Herrscher_of_Sentience_Chibi.webp';
import {Link} from "react-router-dom";


function Home() {
  const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas leo magna, in condimentum ' +
    'enim mattis eu. Mauris pretium est at dignissim porttitor. Curabitur interdum neque ut dui consequat, et commodo ' +
    'ante condimentum. Ut quam arcu, tincidunt pharetra neque at, venenatis dignissim ligula. Aliquam dapibus magna at ' +
    'dolor bibendum, eu ultricies ipsum posuere. Donec augue diam, commodo vitae pulvinar sed, laoreet a mi. ' +
    'Integer vitae nulla purus. Nunc vitae magna auctor, rhoncus diam et, elementum libero. Proin pulvinar justo sit ' +
    'amet felis rhoncus posuere. Integer massa metus, volutpat nec tincidunt eget, ultricies commodo diam. ' +
    'Donec blandit sapien non leo ultrices, ut tincidunt diam malesuada. Cras a lacus neque.'

  return (
    <main className={classes.main}>
      <h1>Anosrep - ваш найкращий помічник для знаходження місця для вашої автівки</h1>
      <div className={classes.slider}>
        <Slider/>
      </div>
      <article className={`${classes.article}`}>
        <span>
          <h3>Lorum ipsen</h3>
          <p>{dummyText}</p>
        </span>
        <img src={img1} alt={'img1'}/>
      </article>
      <article className={`${classes.article} ${classes.toLeft}`}>
        <span>
          <h3>Lorum ipsen2</h3>
          <p>{dummyText}</p>
        </span>
        <img src={img2} alt={'img2'}/>
      </article>
      <article className={`${classes.article}`}>
        <span>
          <h3>Lorum ipsen3</h3>
          <p>{dummyText}</p>
        </span>
        <img src={img3} alt={'img3'}/>
      </article>
      <div className={classes.toBook}>
        <p>Чого баритись? Нумо забронюймо місце!</p>
        <Link className={`btn-outline px-4 py-3 rounded-4 ${button.btnOrange} ${button.link} `}
              to={'/booking'}>Забронювати місце</Link>
      </div>
    </main>
  );
}

export default Home;