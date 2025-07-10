import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import Label from "./Label";
import { image } from "../../assets";
import "flatpickr/dist/flatpickr.css";
// import Hook = flatpickr.Options.Hook;
// import DateOption = flatpickr.Options.DateOption;

const DatePicker = ({
  id,
  mode = "single",
  onChange,
  defaultDate,
  label,
  placeholder,
}) => {
  const inputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const flatPickrInstance = flatpickr(inputRef.current, {
      mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange: (dates, dateStr, instance) => {
        setSelectedDate(dateStr);
        onChange?.(dates, dateStr, instance);
      },
    });

    return () => {
      if (!Array.isArray(flatPickrInstance)) {
        flatPickrInstance.destroy();
      }
    };
  }, [mode, onChange, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          value={selectedDate}
          readOnly
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <img className="size-6" src={image.CalenderLine} alt="calendar" />
        </span>
      </div>
    </div>
  );
};

export default DatePicker;
