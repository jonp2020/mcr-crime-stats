import React from "react";

const LocationInfoBox = ({ info }) => {
  const reportedLocation = info.location;
  const numberOfCrimes = info.crimeLocationData[reportedLocation];
  const month = new Date(info.month);
  const fullMonth = month.toLocaleString("default", { month: "long" });
  const year = month.getFullYear();
  return (
    <div className="location-info-box" name="location-info-box">
      <button
        className="location-info-box-btn-close"
        name="location-info-box-btn"
      >
        x
      </button>
      <h3>{reportedLocation}</h3>
      <p>
        The data shows that there {numberOfCrimes === 1 ? "was" : "were"}{" "}
        {numberOfCrimes} street level{" "}
        {numberOfCrimes === 1 ? "crime" : "crimes"} recorded at or near this
        location in {fullMonth}, {year}.
      </p>
      <button className="location-info-box-more-info">More information</button>
    </div>
  );
};

export default LocationInfoBox;
