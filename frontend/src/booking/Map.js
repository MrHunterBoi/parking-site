import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {useContext} from "react";
import {contextDb} from "./Booking";

function Map() {
  const dummy_data = useContext(contextDb)

  const center = {
    lat: 49.841240462918584,
    lng: 24.02536064237039,
  }

  const mapContainerStyle = {
    width: '45vw',
    height: '60vh',
  }

  const {isLoaded, loadError} = useLoadScript({

  });

  if (loadError) return "Помилка завантаження карти!";

  return (
    <>{
      !isLoaded
        ? <p>Завантажуємо карту...</p>
        : <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
        >
          {dummy_data.map(item => {
            <MarkerF
              position={{lat: item.lat, lng: item.lng}}
            />
          })}
        </GoogleMap>
    }</>
  )
}

export default Map;