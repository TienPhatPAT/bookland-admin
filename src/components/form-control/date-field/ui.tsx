"use client";

import React, { CSSProperties, ReactNode, Ref, useEffect, useMemo, useState } from "react";
import { DateUtils } from "@/utils/date";
import moment from "moment";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";

import {
  Button,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  OutlinedInput,
  OutlinedInputProps,
  useTheme,
} from "@mui/material";

import usePrevious from "@/hooks/usePrevious";
import PopperMenuUI from "@/components/common/PopperMenuUI";

import { CalenderIcon } from "@/assets/icons";

import "react-day-picker/dist/style.css";

import { DATE_PICKER_MAX_YEAR, DATE_PICKER_MIN_YEAR } from "@/constants";

export interface DateFieldUIProps {
  fullWidth?: boolean;
  label?: string;
  helper?: string;
  hideHelper?: boolean;
  FormControlProps?: Omit<FormControlProps, "variant" | "error">;
  FormHelperTextProps?: Omit<FormHelperTextProps, "error">;
  FormLabelProps?: FormLabelProps;
  OutlinedInputProps?: Omit<
    OutlinedInputProps,
    "readOnly" | "disabled" | "inputRef" | "value" | "onChange" | "placeholder"
  >;
  DateProps?: Omit<DayPickerSingleProps, "mode">;
  required?: boolean;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  inputRef?: Ref<Element>;
  clearable?: boolean;
  formatString?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (_newDate?: Date) => void;
  renderer?: {
    Label?: (_label?: ReactNode) => ReactNode;
  };
}
const DateFieldUI = ({
  fullWidth,
  label,
  helper,
  hideHelper,
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  OutlinedInputProps,
  renderer,
  readOnly = false,
  disabled = false,
  clearable = false,
  DateProps,
  error,
  required,
  formatString,
  inputRef,
  placeholder,
  value: externalValue,
  onChange: externalOnChange,
}: DateFieldUIProps) => {
  const theme = useTheme();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const [monthView, setMonthView] = useState<Date>(
    externalValue ? moment(externalValue).toDate() : moment().toDate()
  );
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const previousSelectedDay = usePrevious<Date | undefined>(selectedDay);

  useEffect(() => {
    setSelectedDay(externalValue);
    setMonthView(externalValue || new Date());
  }, [externalValue]);

  const handleDaySelect = (date: Date) => {
    setSelectedDay(date);
    externalOnChange?.(date);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    previousSelectedDay && setMonthView(previousSelectedDay);
  };
  const handleOpenPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleNull = () => {
    setSelectedDay(undefined);
    externalOnChange?.(undefined);
    setOpen(false);
  };
  const formatDate = useMemo(() => {
    if (selectedDay) return moment(selectedDay).format(formatString || DateUtils.DMYFormat);
    return "";
  }, [formatString, selectedDay]);

  const Label = label && (
    <FormLabel
      // error={isFieldError}
      required={required}
      {...FormLabelProps}
    >
      {label}
    </FormLabel>
  );

  return (
    <FormControl
      {...FormControlProps}
      fullWidth={fullWidth}
      // error={error}
    >
      {renderer?.Label?.(Label) || Label}
      <OutlinedInput
        onClick={readOnly || disabled ? undefined : handleOpenPicker}
        notched={false}
        endAdornment={<CalenderIcon sx={{ color: "#8590A2" }} />}
        inputProps={{
          value: formatDate,
        }}
        {...OutlinedInputProps}
        placeholder={placeholder}
        readOnly={true}
        disabled={disabled}
        inputRef={inputRef}
      />
      <PopperMenuUI
        open={open}
        onClose={handleCancel}
        anchorEl={anchorEl}
        sx={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "viewport",
              padding: 16,
            },
          },
        ]}
        paperProps={{
          sx: {
            padding: 0,
            borderRadius: "5px",
            minWidth: "319px",
            width: "100%",
            maxHeight: "66vh",
            overflow: "auto",
            background: "white",
          },
        }}
      >
        <DayPicker
          {...DateProps}
          showOutsideDays
          mode="single"
          captionLayout="dropdown"
          selected={moment(selectedDay).toDate()}
          onMonthChange={setMonthView}
          month={monthView ? moment(monthView).toDate() : undefined}
          fromYear={DATE_PICKER_MIN_YEAR}
          weekStartsOn={1}
          toYear={DATE_PICKER_MAX_YEAR}
          onDayClick={handleDaySelect}
          style={
            {
              "--rdp-accent-color": theme.palette.primary.main,
            } as CSSProperties
          }
        />
        {clearable && (
          <Button
            size="small"
            onClick={handleNull}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            Clear
          </Button>
        )}
      </PopperMenuUI>
      {!hideHelper && !!helper && (
        <FormHelperText error={error} sx={{ marginLeft: 0 }} {...FormHelperTextProps}>
          {helper}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DateFieldUI;
