/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldError, useController } from "react-hook-form";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  OutlinedInputProps,
  Stack,
  SxProps,
} from "@mui/material";

import { PhoneNumber } from "@/models/common";

import "react-phone-input-2/lib/material.css";

import { INIT_COUNTRY_CODE } from "@/constants";

import { InputContainer, StyledInput, StyledPhoneInput } from "./styles";

interface PhoneNumberFieldProps extends Omit<OutlinedInputProps, "value" | "onChange"> {
  label?: string;
  sx?: SxProps;
  fullWidth?: boolean;
  name: string;
  control?: Control<any>;
  hideHelper?: boolean;
  errorMess?: string;
  rootProps?: FormControlProps;
  helperTextProps?: FormHelperTextProps;
  value?: PhoneNumber;
  onChange?: (value: PhoneNumber) => void;
  getErrorMess?: (error: FieldError, value: PhoneNumber) => string;
}

export const PhoneNumberField = ({
  label,
  name,
  fullWidth = true,
  disabled,
  readOnly,
  rootProps = {},
  value: externalValue,
  onChange: externalOnChange,
  control,
  inputProps,
  hideHelper,
  helperTextProps,
  errorMess,
  getErrorMess,
  ...rest
}: PhoneNumberFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = control
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useController({ name, control })
    : {
        field: {
          onChange: externalOnChange,
          value: externalValue,
          onBlur: undefined,
          ref: undefined,
        },
        fieldState: { error: undefined },
      };

  const _onChange = (val: PhoneNumber) => {
    if (control) externalOnChange?.(val);
    onChange?.(val);
  };

  return (
    <FormControl variant="outlined" fullWidth={fullWidth} {...rootProps}>
      {label && (
        <Stack flexDirection="row" alignItems="center">
          <FormLabel htmlFor={name}>{label}</FormLabel>
        </Stack>
      )}
      <InputContainer $error={!!error} $disabled={disabled || readOnly}>
        <StyledPhoneInput
          enableSearch
          inputProps={{ tabIndex: 9999 }}
          disabled={disabled || readOnly}
          value={value?.countryCode ?? ""}
          onChange={(val: any, _: any) => {
            _onChange({
              countryCode: `+${val}`,
              phoneNumber: value?.phoneNumber,
            });
          }}
          country={INIT_COUNTRY_CODE.name}
          specialLabel=""
          preferredCountries={["fr", "us", "gb", "de"]}
          countryCodeEditable={false}
        />
        <StyledInput
          value={value?.phoneNumber ?? ""}
          onChange={(e) => {
            _onChange({
              countryCode: value?.countryCode ? value?.countryCode : INIT_COUNTRY_CODE.code,
              phoneNumber: e.target.value,
            });
          }}
          onBlur={onBlur}
          inputRef={ref}
          notched={false}
          inputProps={{
            ...inputProps,
          }}
          readOnly={readOnly}
          disabled={disabled}
          type="number"
          onWheel={(e) =>
            e.target instanceof HTMLElement &&
            (e.target as any).type === "number" &&
            e.target.blur()
          }
          {...rest}
        />
      </InputContainer>

      {!hideHelper &&
        (error?.message ||
          (error as any)?.countryCode ||
          (error as any)?.phoneNumber ||
          errorMess) && (
          <FormHelperText
            error={!!error || !!errorMess}
            sx={{ textAlign: label ? "left" : "right" }}
            {...helperTextProps}
          >
            {getErrorMess
              ? getErrorMess(error as FieldError, value)
              : error?.message ||
                (error as any)?.countryCode?.message ||
                (error as any)?.phoneNumber?.message ||
                errorMess}
          </FormHelperText>
        )}
    </FormControl>
  );
};

export default PhoneNumberField;
