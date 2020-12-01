import { useState } from "react";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
  .react-datepicker__input-container input {
    width: 75px;
    text-align: center;
  }
  .react-datepicker__month-wrapper {
    display: flex;
    width: 150px;
  }
`;

const UpdateInfo = ({
  selectedYear,
  selectedMonth,
  setHandleMonthChange,
  setHandleYearChange,
}) => {
  const monthAndYear = parseISO(`${selectedYear}-${selectedMonth}`);
  const [startDate, setStartDate] = useState(new Date(monthAndYear));
  // console.log("startDate", startDate);
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
            // handleChange(currentMonth, currentYear);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </Styles>
    </div>
  );
};

export default UpdateInfo;
