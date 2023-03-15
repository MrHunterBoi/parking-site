import classes from "./Home.module.css";
import button from "../header/Header.module.css"
import Slider from "./Slider";
import img1 from '../static/img/lot-crammed.jpg';
import img2 from '../static/img/lot.jpg';
import img3 from '../static/img/cameras.jpg';
import {Link} from "react-router-dom";

function Home() {
  return (
    <main className={classes.main}>
      <h1>Anosrep - ваш найкращий помічник для знаходження місця для вашої автівки</h1>
      <div className={classes.slider}>
        <Slider/>
      </div>
      <article className={`px-2 py-3 ${classes.article}`}>
        <span className={`px-4 py-3 rounded-5 text-white`}>
          <h3>Надоїло весь час шукати місце для паркування? Не проблема!</h3>
          <p>Наш сайт дозволить вам забронювати місце паркування у будь-який момент та в будь-якому місці.
            Наша система верифікації зробить так, щоб ніхто крім вас не зміг зайняти у вас місце. Можете забути про часи
          , коли у вас забирали місце прямо з-під носа!</p>
        </span>
        <img className={`rounded-5`} src={img1} alt={'img1'}/>
      </article>
      <article className={`px-2 py-3 ${classes.article} ${classes.toLeft}`}>
        <span className={`px-4 py-3 rounded-5 text-white`}>
          <h3>Чому саме ми?</h3>
          <p>Ми співпрацюємо з безліччю власниками паркингових майданчиків. Ми гарантуємо вам високу якість середовища
            парковки, найшвидшу ідентифікацію клієнта та максимально зручні локації парковок.<br/><br/>
            Цілодобово.<br/><br/>
            Впродовж року.</p>
        </span>
        <img className={`rounded-5`} src={img2} alt={'img2'}/>
      </article>
      <article className={`px-2 py-3 ${classes.article}`}>
        <span className={`px-4 py-3 rounded-5 text-white`}>
          <h3>Безпека</h3>
          <p>Ми особисто спостерігаємо за вашими транспортними засобами. Завдяки високотехнологічним камерам
            спостереження та автоматичній ізоляції парковки при спробі кражі, ми гарантуємо безпеку вашого авто</p>
        </span>
        <img className={`rounded-5`} src={img3} alt={'img3'}/>
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