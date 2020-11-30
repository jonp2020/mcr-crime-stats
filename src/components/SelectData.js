import { useState, useEffect } from "react";
import Map from "./Map";
import UpdateInfo from "./UpdateInfo";

const SelectData = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth - 1);
  const [returnedData, setReturnedData] = useState([]);
  const [handleMonthChange, setHandleMonthChange] = useState(null);
  const [handleYearChange, setHandleYearChange] = useState(null);

  useEffect(() => {
    const fetchStopData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=53.480963&lng=-2.2369427&date=${selectedYear}-${selectedMonth}`
      );

      const data = await res.json();
      setReturnedData(data);
      setLoading(false);
      console.log("data", data);
    };
    fetchStopData();
  }, [selectedYear, selectedMonth]);

  // const handleChange = (month, year) => {
  //   // console.log("i;ve been clicked");

  // };

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
        <UpdateInfo
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setHandleMonthChange={setHandleMonthChange}
          setHandleYearChange={setHandleYearChange}
          // handleChange={handleChange}
        />
        <button onClick={handleClick}>Change date</button>
      </div>
      <p className="select-data-container-pins-text">
        Click on the pins on the map for more information
      </p>

      {!loading ? <Map crimeData={returnedData} /> : <h1>Loading...</h1>}
    </div>
  );
};

export default SelectData;
