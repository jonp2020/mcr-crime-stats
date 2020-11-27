import React from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ center }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
        defaultCenter={center}
        defaultZoom={15}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;

Map.defaultProps = {
  center: {
    lat: 53.4809634,
    lng: -2.2369427,
  },
  zoom: 15,
};
