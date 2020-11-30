import React from "react";
import { MdPinDrop } from "react-icons/md";

const LocationMarker = ({ lat, lng, key, onClick }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <MdPinDrop />
    </div>
  );
};

export default LocationMarker;
