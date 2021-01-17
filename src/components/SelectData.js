import { useState, useEffect } from "react";
import Map from "./Map";
import UpdateInfo from "./UpdateInfo";
import Loader from "./Loader";

const SelectData = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [returnedData, setReturnedData] = useState([]);
  const [handleMonthChange, setHandleMonthChange] = useState(null);
  const [handleYearChange, setHandleYearChange] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStopData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://data.police.uk/api/crimes-street/all-crime?lat=53.480963&lng=-2.2369427&date=${selectedYear}-${selectedMonth}`
        );
        const data = await res.json();
        setReturnedData(data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };
    fetchStopData();
  }, [selectedYear, selectedMonth]);

  const handleClick = (e) => {
    setSelectedMonth(handleMonthChange);
    setSelectedYear(handleYearChange);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemeber",
    "December",
  ];

  return (
    <div>
      <div className="select-data-container">
        <p>Showing data for:</p>
        <p>
          Street level crime recorded in{" "}
          <span>
            {months[selectedMonth - 1]} in {selectedYear}
          </span>
        </p>
        <div className="date-picker-and-btn-wrapper">
          <UpdateInfo
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            setHandleMonthChange={setHandleMonthChange}
            setHandleYearChange={setHandleYearChange}
          />
          <button className="select-data-date-btn" onClick={handleClick}>
            Change date
          </button>
        </div>
      </div>
      {error || returnedData.length === 0 ? (
        <p className="select-data-container-pins-text">
          No data available for the current selected month
        </p>
      ) : (
        <p className="select-data-container-pins-text">
          Click on the pins on the map for more information
        </p>
      )}

      {!loading ? <Map crimeData={returnedData} /> : <Loader />}
    </div>
  );
};

export default SelectData;
