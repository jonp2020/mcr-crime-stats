import React from "react";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LoacationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";
import ShowLocalAreaGraph from "./ShowLocalAreaGraph";

const Map = ({ center, crimeData }) => {
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
  const [showLocalGraph, setShowLocalGraph] = useState(null);
  const crimeLocations = {};

  const pinDrops = crimeData.map((crime, i) => {
    if (crimeLocations[crime.location.street.id]) {
      crimeLocations[crime.location.street.name]++;
      crimeLocations[crime.location.street.id]++;
    } else {
      crimeLocations[crime.location.street.name] = 1;
      crimeLocations[crime.location.street.id] = 1;
    }

    return (
      <LoacationMarker
        lat={crime.location.latitude}
        lng={crime.location.longitude}
        key={i}
        onClick={() => {
          setSelectedLocationInfo({
            crimeCategory: crime.category,
            location: crime.location.street.name,
            locationId: crime.location.street.id,
            month: crime.month,
            crimeLocationData: crimeLocations,
          });
        }}
      />
    );
  });

  const handleClick = (e) => {
    if (
      e.target.className !== "location-info-box" &&
      selectedLocationInfo !== null
    )
      setSelectedLocationInfo(null);

    if (
      e.target.classList.contains("rv-xy-plot__series") ||
      e.target.classList.contains("rv-xy-plot__inner")
    ) {
      return;
    }

    if (
      e.target.className !== "show-local-area-graph-header" &&
      showLocalGraph !== null
    ) {
      setShowLocalGraph(null);
    }
    if (
      e.target.className !== "show-local-area-graph-text" &&
      showLocalGraph !== null
    ) {
      setShowLocalGraph(null);
    }
    if (
      e.target.className !== "show-local-area-graph-wrapper" &&
      showLocalGraph !== null
    ) {
      setShowLocalGraph(null);
    }
  };

  const handleCloseClick = (e) => {
    if (e.target.className === "show-local-area-graph-close-btn") {
      setShowLocalGraph(null);
    }
  };

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="map" onClick={handleClick} name="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
        defaultCenter={center}
        defaultZoom={14}
      >
        {pinDrops}
      </GoogleMapReact>
      {selectedLocationInfo && (
        <LocationInfoBox
          info={selectedLocationInfo}
          setSelectedLocationInfo={setSelectedLocationInfo}
          setShowLocalGraph={setShowLocalGraph}
          style={mapStyles}
        />
      )}
      {showLocalGraph && (
        <ShowLocalAreaGraph
          info={selectedLocationInfo}
          showLocalGraph={showLocalGraph}
          crimeData={crimeData}
          handleCloseClick={handleCloseClick}
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
  zoom: 14,
};
