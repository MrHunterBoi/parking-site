import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Booking from "./booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/booking'} element={<Booking/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
