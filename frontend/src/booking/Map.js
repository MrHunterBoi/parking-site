import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {useContext} from "react";
import {contextDb} from "./Booking";

function Map() {
  const context = useContext(contextDb)

  const mapContainerStyle = {
    width: '45vw',
    height: '60vh',
  }

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAPw96EZ38DjIrH96aWV6Im9HBQ-bN8FuM',
  });

  if (loadError) return "Помилка завантаження карти!";

  const handleMarkerClick = (e) => {
    context.setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()});

    context.dbData.map((item, index) => {
        if(item.lat === e.latLng.lat() && item.lng === e.latLng.lng()) {
          context.setOptionIndex(index);
        }
      }
    );
  }

  return (
    <>{
      !isLoaded
        ? <p>Завантажуємо карту...</p>
        : <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={context.center}
        >
          {context.dbData.map(item =>
            <MarkerF
              position={{lat: item.lat, lng: item.lng}}
              onClick={handleMarkerClick}
            />
          )}
        </GoogleMap>
    }
    </>
  )
}

export default Map;