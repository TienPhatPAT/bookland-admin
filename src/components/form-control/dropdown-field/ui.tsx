/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { DebouncedFunc } from "lodash";
import { AnyObject } from "yup";

import {
  Checkbox,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

import { ArrowDownIcon } from "@/assets/icons";

import { StyledMenuItem, StyledTextField } from "./styles";

export interface DropdownFieldUIProps<T>
  extends Omit<SelectProps<T[keyof T]>, "onChange" | "value"> {
  optionList: T[];
  bindLabel?: keyof T;
  bindValue?: keyof T;
  fullWidth?: boolean;
  label?: string;
  helper?: string;
  withoutSearch?: boolean;
  hideHelper?: boolean;
  required?: boolean;
  placeholder?: string;
  FormControlProps?: Omit<FormControlProps, "variant">;
  FormHelperTextProps?: FormHelperTextProps;
  FormLabelProps?: FormLabelProps;
  onChange?: (_value: string | string[]) => void;
  value?: string | string[];
  renderer?: {
    Label?: (_label?: ReactNode) => ReactNode;
    OptionLabel?: (_option: T /*, checked: boolean*/) => ReactNode;
  };
  handleSearch?: DebouncedFunc<(...args: any[]) => void>;
}

const DropdownFieldUI = <T extends AnyObject = AnyObject>({
  optionList,
  bindLabel = "label",
  bindValue = "value",
  withoutSearch = false,
  label,
  helper,
  hideHelper,
  required,
  placeholder,
  fullWidth,
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  value: externalValue,
  onChange: externalOnChange,
  sx,
  disabled,
  readOnly,
  inputProps,
  renderer,
  handleSearch,
  ...selectRest
}: DropdownFieldUIProps<T>) => {
  const isFieldError = selectRest.error;
  const isMultiple = selectRest.multiple;

  const [value, setValue] = useState<string | string[]>(isMultiple ? [] : "");

  useEffect(() => {
    if (isMultiple) {
      setValue(externalValue || []);
    } else {
      setValue((externalValue as string) ?? "");
    }
  }, [externalValue, isMultiple]);

  const hasPlaceholder =
    placeholder && ((Array.isArray(value) && value && value?.length <= 0) || !value);

  const withExternalOnChange = (event: SelectChangeEvent<T[keyof T]>) => {
    const newValue = event.target.value;
    externalOnChange?.(newValue);
    setValue(newValue);
  };

  const Label = label && (
    <FormLabel
      // error={isFieldError}
      htmlFor={selectRest?.id}
      required={required}
      {...FormLabelProps}
    >
      {label}
    </FormLabel>
  );

  return (
    <FormControl
      {...FormControlProps}
      variant="outlined"
      fullWidth={fullWidth}
      error={isFieldError}
    >
      {renderer?.Label?.(Label) || Label}
      <Select
        IconComponent={ArrowDownIcon}
        sx={{
          ...(hasPlaceholder && {
            "& .MuiSelect-select::before": {
              color: "red",
              content: `'${placeholder}'`,
            },
          }),
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiListItemIcon-root": {
            display: "none",
          },
          "& .MuiCheckbox-root": {
            display: "none",
          },
          ...sx,
        }}
        MenuProps={{
          sx: { maxHeight: 500 },
          autoFocus: isMultiple ? false : true,
        }}
        inputProps={{
          readOnly,
          disabled,
          ...inputProps,
        }}
        readOnly={readOnly}
        disabled={disabled}
        onChange={withExternalOnChange}
        value={value as T[keyof T]}
        {...selectRest}
      >
        {!withoutSearch && (
          <ListSubheader>
            <StyledTextField
              variant="standard"
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              placeholder="Search item"
              autoFocus
              InputProps={{ disableUnderline: true }}
              onChange={(e) => handleSearch?.(e.target.value)}
            />
          </ListSubheader>
        )}
        <MenuItem value="" hidden sx={{ display: "none" }}></MenuItem>
        {optionList.length === 0 && (
          <StyledMenuItem disabled value="loading...">
            No Data
          </StyledMenuItem>
        )}
        {optionList.length !== 0 &&
          optionList.map((option, index) => {
            if (isMultiple) {
              return (
                <StyledMenuItem key={`${option[bindValue]}_${index}`} value={option[bindValue]}>
                  <Checkbox checked={value.indexOf(option[bindValue]) > -1} />
                  {renderer?.OptionLabel?.(option) || option[bindLabel]}
                </StyledMenuItem>
              );
            }
            return (
              <MenuItem key={`${option[bindValue]}_${index}`} value={option[bindValue]}>
                {renderer?.OptionLabel?.(option) || option[bindLabel]}
              </MenuItem>
            );
          })}
      </Select>
      {!hideHelper && !!helper && (
        <FormHelperText error={isFieldError} sx={{ marginLeft: 0 }} {...FormHelperTextProps}>
          {helper}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DropdownFieldUI;
