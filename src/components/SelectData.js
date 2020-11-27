import React from "react";
import Map from "./Map";

const SelectData = () => {
  return (
    <div>
      <div className="select-data-container">
        <h2>Showing data for:</h2>
        <button>Change</button>
      </div>
      <Map />
    </div>
  );
};

export default SelectData;
