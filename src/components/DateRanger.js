import React, { useState } from "react";
import { Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { DateRangePicker as ChakraDateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // react-date-range stil dosyası
import "react-date-range/dist/theme/default.css"; // react-date-range tema dosyası

const DateRangePicker = ({selectedRange, setSelectedRange, formatSelectedDate}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelectRange = (ranges) => {
    setSelectedRange([ranges.selection]);
    setShowCalendar(false);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };


  return (
    <Box>
      <InputGroup>
        <Input
          value={formatSelectedDate(selectedRange[0])}
          pr="4.5rem"
          width={350}
          placeholder="Tarih Seç"
          readOnly
          onClick={handleToggleCalendar}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Tarih Seç"
            icon={<CalendarIcon />}
            h="full"
            onClick={handleToggleCalendar}
          />
        </InputRightElement>
      </InputGroup>
      {showCalendar && (
        <Box position="absolute" zIndex={10}>
          <ChakraDateRangePicker
            ranges={selectedRange}
            onChange={handleSelectRange}
            editableDateInputs={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default DateRangePicker;
