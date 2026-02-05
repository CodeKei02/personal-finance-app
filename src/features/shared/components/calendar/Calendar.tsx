import { useState } from "react";
import { DayPicker } from "react-day-picker";

interface CalendarProps {
  onDateSelect: (date: Date | undefined) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateSelect(date);
  };
  return (
    <div>
      <DayPicker
        showOutsideDays
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        className="absolute bg-greyDark text-beigeLight w-[300px] mx-auto p-2.5 text-base border border-gray-300 rounded-md cursor-pointer transition-all duration-300 ease-in [&_.rdp-months]:relative [&_button]:border-0 [&_.rdp-button_next]:absolute [&_.rdp-button_next]:right-0 [&_.rdp-button_next]:cursor-pointer [&_.rdp-button_previous]:cursor-pointer [&_.rdp-month_caption]:absolute [&_.rdp-month_caption]:top-0 [&_.rdp-month_caption]:left-[100px] [&_.rdp-month]:w-full [&_.rdp-month]:grid [&_.rdp-weekdays]:text-beigeNormal [&_.rdp-day_button]:font-semibold [&_.rdp-day_button]:rounded-md [&_.rdp-day_button]:bg-transparent [&_.rdp-day_button]:text-beigeLight [&_.rdp-day_button]:w-[35px] [&_.rdp-day_button]:h-[35px]"
      />
    </div>
  );
};
