import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Booking from "./booking/Booking";
import LoginPage from "./login/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import AdminPage from "./admin/AdminPage";
import AboutMe from "./about/AboutMe";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/booking'} element={<Booking/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<ProfilePage/>}/>
        <Route path={'/admin'} element={<AdminPage/>}/>
        <Route path={'/about'} element={<AboutMe/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
