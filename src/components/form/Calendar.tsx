import { useState } from "react";
import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import { colors } from "../../styles/theme";

const StyledDatePicker = styled(DayPicker)`
  position: absolute;
  background-color: ${colors.greyDark};
  color: ${colors.beigeLight};
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;

  .rdp-months{
    position: relative;
  }

  button{
    border: 0px;
  }

  .rdp-button_next{
    position: absolute;
    right: 0px;
    
  }

  .rdp-button_next, .rdp-button_previous{
    cursor: pointer;
  }
  

  .rdp-month_caption{
    position: absolute;
    top: 0;
    left: 100px;
  }

  .rdp-month{
    width: 100%;
    display: grid;
  }

  .rdp-weekdays{
    color: ${colors.beigeNormal};
  }

  .rdp-day_button{
    font-weight: 600;
    border-radius: 5px;
    background-color: transparent;
    color: ${colors.beigeLight};
    width: 35px;
    height: 35px; 
  }
`;

interface CalendarProps {
  onDateSelect: (date: Date | undefined) => void;
}

export const Calendar: React.FC<CalendarProps> = ({onDateSelect}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateSelect(date);
  }
  return (
    <div>
      <StyledDatePicker
        showOutsideDays
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
      />
    </div>
  )

}
