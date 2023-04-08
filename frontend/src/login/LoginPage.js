import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import classes from './LoginPage.module.css'
import {parseLocalProfile} from "../apis/API";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function LoginPage() {
  const navigator = useNavigate();
  const profileData = parseLocalProfile();

  useEffect(() => {
    if (profileData) navigator('/');
  }, [])

  return (
    <main className={classes.main}>
      <LoginForm />
      <SignUpForm />
    </main>
  )
}

export default LoginPage;