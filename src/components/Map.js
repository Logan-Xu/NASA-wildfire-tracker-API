import { useState } from 'react'
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null)

  const markers = eventData.map((event) => {
    if (event.categories[0].id === "wildfires") {
      return (
        <LocationMarker
          lat={event.geometry[0].coordinates[1]}
          lng={event.geometry[0].coordinates[0]}
          onClick={() => setLocationInfo({
            id: event.id, title: event.title
          })}
        />
      );
    }
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "***Hidden for security reason***" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: -42.8826,
    lng: 147.3257,
  },
  zoom: 6,
};

export default Map;
