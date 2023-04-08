import classes from "../booking/Form.module.css";
import sClasses from './LoginForm.module.css'
import {createProfile, getProfiles, setLocalProfile} from "../apis/API";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import lClasses from "./LoginForm.module.css";

function SignUpForm() {
  const navigator = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: e.target.emailS.value,
      password: e.target.passwordS.value,
      cPassword: e.target.cPassword.value
    }

    if (data.password.length < 8) {
      setErrorMsg('Пароль надто короткий (Мінімум 8 символів)');
      return;
    }
    if (data.password !== data.cPassword) {
      setErrorMsg('Паролі не збігаються');
      return;
    }

    getProfiles().then(res => {
      for (const p of res) {
        if (p.email === data.email) {
          setErrorMsg('Такий e-mail уже є');
          return;
        }
      }
    });

    setErrorMsg('');
    createProfile(data)
      .then(res => {
        setLocalProfile(res);
        navigator('/');
      })
      .catch(() => {
        navigator('/')
      });
  }

  return (
    <div className={sClasses.loginContainer}>
      <h2>Реєстрація</h2>
      <form className={`${classes.form}`} onSubmit={handleSubmit}>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"emailS"} key={"emailSLabel"}>Електронна пошта</label>
          <input type={"email"} id={"emailS"} key={"emailS"} className={"form-control"} required/>
        </div>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"passwordS"} key={"passwordSLabel"}>Пароль</label>
          <input type={"password"} id={"passwordS"} key={"passwordS"} className={"form-control"} required/>
        </div>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"cPassword"} key={"cPasswordLabel"}>Підтвердіть пароль</label>
          <input type={"password"} id={"cPassword"} key={"cPassword"} className={"form-control"} required/>
        </div>
        {errorMsg ? <p className={lClasses.error}>{errorMsg}</p> : <></>}
        <button type="submit"
                className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.submit}`}>Зареєструватись!
        </button>
      </form>
    </div>
  )
}

export default SignUpForm;