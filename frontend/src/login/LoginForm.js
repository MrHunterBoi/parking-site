import classes from "../booking/Form.module.css";
import lClasses from './LoginForm.module.css'
import {getProfiles, setLocalProfile} from "../apis/API";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function LoginForm() {
  const navigator = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: e.target.emailL.value,
      password: e.target.passwordL.value,
    }

    getProfiles().then(res => {
      for (const p of res) {
        if (p.email === data.email && p.password === data.password) {
          setLocalProfile(p)
          navigator('/');
          return;
        }
      }
      setErrorMsg('Неправильний e-mail або пароль')
    });
  }

  return (
    <div className={lClasses.loginContainer}>
      <h2>Увійти</h2>
      <form className={`${classes.form}`} onSubmit={handleSubmit}>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"emailL"} key={"emailLLabel"}>Електронна пошта</label>
          <input type={"email"} id={"emailL"} key={"emailL"} className={"form-control"} required/>
        </div>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"passwordL"} key={"passwordLLabel"}>Пароль</label>
          <input type={"password"} id={"passwordL"} key={"passwordL"} className={"form-control"} required/>
        </div>
        {errorMsg ? <p className={lClasses.error}>{errorMsg}</p> : <></>}
        <button type="submit"
                className={`btn-outline px-4 py-3 rounded-4 ${classes.btnOrange} ${classes.submit}`}>Увійти!
        </button>
      </form>
    </div>
  )
}

export default LoginForm;