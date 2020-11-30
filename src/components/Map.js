import React from "react";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LoacationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ center, crimeData }) => {
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
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
        onClick={() => {
          console.log("clicked");

          setSelectedLocationInfo({
            crimeCategory: crime.category,
            location: crime.location.street.name,
            month: crime.month,
            crimeLocationData: crimeLocations,
          });
        }}
      />
    );
  });

  const handleClick = (e) => {
    console.log("here in handle click", e.target.className);
    if (
      e.target.className !== "location-info-box" &&
      selectedLocationInfo !== null
    )
      setSelectedLocationInfo(null);
  };

  return (
    <div className="map" onClick={handleClick} name="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {pinDrops}
      </GoogleMapReact>
      {selectedLocationInfo && (
        <LocationInfoBox
          info={selectedLocationInfo}
          setSelectedLocationInfo={setSelectedLocationInfo}
        />
      )}
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
