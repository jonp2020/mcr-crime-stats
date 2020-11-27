import { useState, useEffect } from "react";
import Map from "./Map";

const SelectData = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth - 1);
  const [returnedData, setReturnedData] = useState([]);

  useEffect(() => {
    const fetchStopData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://data.police.uk/api/stops-street?lat=53.480963&lng=-2.2369427&date=${selectedYear}-${selectedMonth}`
      );

      const data = await res.json();
      setReturnedData(data);
      setLoading(false);
    };
    fetchStopData();
  }, [selectedYear, selectedMonth]);

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
      <Map />
    </div>
  );
};

export default SelectData;
