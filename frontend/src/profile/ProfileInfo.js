import pClasses from "../booking/Form.module.css";
import classes from './ProfileInfo.module.css'
import {useState, useContext} from "react";
import {contextProfile} from "./ProfilePage";
import {editProfile, getProfiles, setLocalProfile} from "../apis/API";
import lClasses from "../login/LoginForm.module.css";

function ProfileInfo() {
  const context = useContext(contextProfile)
  const [editStatus, setEditStatus] = useState(false);
  const [email, setEmail] = useState(context.profileData.email);
  const [password, setPassword] = useState(context.profileData.password);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();

    if (editStatus) {
      if (e.target.password.value.toString().length < 8) {
        setErrorMsg('Пароль надто короткий (Мінімум 8 символів)');
        return;
      }

      getProfiles().then(res => {
        for (const p of res) {
          if (p.email === e.target.email.value && p.email !== context.profileData.email) {
            setErrorMsg('Такий e-mail уже є');
            return;
          }
        }
        setErrorMsg('');
        context.profileData.email = e.target.email.value;
        context.profileData.password = e.target.password.value;
        setLocalProfile(context.profileData);
        editProfile(context.profileData);
        setEditStatus(!editStatus);
      })
    }

    else setEditStatus(!editStatus);
  }

  const handleCancel = (e) => {
    e.preventDefault();

    setEmail(context.profileData.email);
    setPassword(context.profileData.password);
    setEditStatus(!editStatus);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePass = (e) => {
    setPassword(e.target.value)
  }

  return (
    <article className={classes.article}>
      <h2>Інформація про профіль</h2>
      <form className={`${pClasses.form}`} onSubmit={handleEdit}>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"email"} key={"nameLabel"}>Електронна пошта</label>
          <input disabled={!editStatus} type={"email"} id={"email"} key={"email"}
                 className={"form-control"} required value={email} onChange={handleChangeEmail}/>
        </div>
        <div className={"input-group mb-3"}>
          <label className={"input-group-text"} htmlFor={"password"} key={"nameLabel"}>Пароль</label>
          <input disabled={!editStatus} type={editStatus ? 'text' : "password"} id={"password"} key={"password"}
                 className={"form-control"} required value={password} onChange={handleChangePass}/>
        </div>
        {errorMsg ? <p className={lClasses.error}>{errorMsg}</p> : <></>}
        <div className={classes.buttons}>
          <button type="submit"
                  className={`btn-outline px-4 py-3 rounded-4 ${pClasses.btnOrange} ${pClasses.submit}`}>
            {editStatus ? 'Зберегти' : 'Редагувати'}
          </button>
          {editStatus ? <button onClick={handleCancel} className={`btn-outline px-4 py-3 rounded-4 
          ${pClasses.btnOrange} ${pClasses.submit}`}>Скасувати</button> : <></>}
        </div>
      </form>
    </article>
  )
}

export default ProfileInfo;