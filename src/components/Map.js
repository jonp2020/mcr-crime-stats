import React from "react";
import GoogleMapReact from "google-map-react";
import LoacationMarker from "./LocationMarker";

const Map = ({ center, crimeData }) => {
  const crimeLocations = {};

  const pinDrops = crimeData.map((crime, i) => {
    if (crimeLocations[crime.location.street.name]) {
      crimeLocations[crime.location.street.name]++;
    } else crimeLocations[crime.location.street.name] = 1;

    return (
      <LoacationMarker
        lat={crime.location.latitude}
        lng={crime.location.longitude}
        key={i}
      />
    );
  });
  console.log("inside map ", crimeData);
  console.log("crimeLocations", crimeLocations);
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {pinDrops}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

Map.defaultProps = {
  center: {
    lat: 53.4809634,
    lng: -2.2369427,
  },
  zoom: 13,
};
