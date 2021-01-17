import { useState } from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
  .react-datepicker__input-container input {
    width: 75px;
    text-align: center;
    font-size: 16px;
  }
  .react-datepicker__month-wrapper {
    display: flex;
    width: 150px;
  }
`;
const currentDate = new Date();

const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
const date = ("0" + currentDate.getDate()).slice(-2);
const currentDateString = `${currentDate.getFullYear()}-${month}-${date}`;

const UpdateInfo = ({
  selectedYear,
  selectedMonth,
  setHandleMonthChange,
  setHandleYearChange,
}) => {
  const monthAndYear = parseISO(`${selectedYear}-${selectedMonth}`);
  const [startDate, setStartDate] = useState(new Date(monthAndYear));

  return (
    <div className="date-picker">
      <Styles>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth() + 1;
            setHandleMonthChange(currentMonth);
            setHandleYearChange(currentYear);
            setStartDate(date);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          maxDate={new Date(currentDateString)}
        />
      </Styles>
    </div>
  );
};

export default UpdateInfo;
