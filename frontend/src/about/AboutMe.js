import classes from './AboutMe.module.css';
import mobius from '../static/img/mobius.jpg'

function AboutMe() {
  return(
    <main className={classes.main}>
      <h2>Про мене</h2>
      <article className={classes.article}>
        <img src={mobius} alt="avatar"/>
        <span>
          <p>А, ви спромоглися знайти цю сторінку? Вітаю... Чесно кажучи, я навіть не знаю, що сюди вписувати.
            Я не дуже люблю себе описувати. <br /><br />Ну... Мене звати Максим, я зараз навчаюсь на другому курсі
            за спеціальністю Комп'ютерні науки в НУ "ЛП".<br /><br />Що мені подобається? Ну.. у вільний час
            мені подобається залипати в ігри. Недавно (рік тому) затягнуло в Honkai Impact 3, дуже раджу
            пройти суто заради сюжету (афігезно затягує). А ще мені подобається чай. З лимончиком.
            І канапками. Ось<br /><br />
            Не люблю показувати своє лице або фоткатись узагалі тому зазвичай використовую аватарки класних персонажів.
          Тому тримайте Мобіус замість мого симпатичного личка :)</p>
        </span>
      </article>
    </main>
  )
}

export default AboutMe;