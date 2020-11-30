import { useState, useEffect } from "react";
import Map from "./Map";

const SelectData = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth - 1);
  const [returnedData, setReturnedData] = useState([]);

  useEffect(() => {
    const fetchStopData = async () => {
      setLoading(true);
      const res = await fetch(
        // `https://data.police.uk/api/stops-street?lat=53.480963&lng=-2.2369427&date=${selectedYear}-${selectedMonth}`
        `https://data.police.uk/api/crimes-street/all-crime?lat=53.480963&lng=-2.2369427&date=${selectedYear}-${selectedMonth}`
      );

      const data = await res.json();
      setReturnedData(data);
      setLoading(false);
      console.log(data);
    };
    fetchStopData();
  }, [selectedYear, selectedMonth]);

  // https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2017-01

  return (
    <div>
      <div className="select-data-container">
        <p>Showing data for:</p>
        <p>
          <span>Stop and search: </span>Piccadilly Gardens{" "}
          <span>in October 2020</span>
        </p>
        <button>Change</button>
      </div>
      {!loading ? <Map crimeData={returnedData} /> : <h1>Loading...</h1>}
    </div>
  );
};

export default SelectData;
