import Form from "./Form";
import classes from "./Booking.module.css"
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";

function Booking () {
  const center = {
    lat: 49.841240462918584,
    lng: 24.02536064237039,
  }

  const mapContainerStyle = {   
    width: '45vw',
    height: '60vh',
  }

  const{isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAPw96EZ38DjIrH96aWV6Im9HBQ-bN8FuM',
  });

  if (loadError) return "Помилка завантаження карти!";

  return (
    <main className={classes.main}>
      <h1>Бронювання паркувального місця</h1>
      <div className={classes.booking}>
        <Form />
        {!isLoaded 
        ? <p>Завантажуємо карту...</p> 
        : <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
          >
            <MarkerF
              position={center} 
            />
          </GoogleMap>
        }
      
      </div>
    </main>
  )
}

export default Booking;