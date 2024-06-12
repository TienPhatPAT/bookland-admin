import React, { ChangeEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { functionKeys } from "@/constants";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  IconButton,
  InputBaseComponentProps,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";

import { theme } from "@/theme";
import EyeIcon from "@/assets/icons/eye-icon";
import EyeOffIcon from "@/assets/icons/eye-off-icon";

export interface InputFieldUIProps extends Omit<OutlinedInputProps, "onChange" | "value"> {
  fullWidth?: boolean;
  label?: string;
  helper?: string;
  hideHelper?: boolean;
  FormControlProps?: Omit<FormControlProps, "variant">;
  FormHelperTextProps?: FormHelperTextProps;
  FormLabelProps?: FormLabelProps;
  required?: boolean;
  inputProps?: InputBaseComponentProps;
  //custome
  limit?: number;
  onChange?: (_value: string) => void;
  value?: string;
  renderer?: {
    Label?: (_label?: ReactNode) => ReactNode;
  };
  isSearch?: boolean;
}
type InputSwitchType = "text" | "password";
const InputFieldUI = ({
  label,
  helper,
  fullWidth = false,
  required = false,
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  limit,
  hideHelper = false,
  inputProps,
  onChange: externalOnChange,
  value: externalValue,
  renderer,
  isSearch,
  ...outlinedInputRest
}: InputFieldUIProps) => {
  const isFieldError = outlinedInputRest.error;
  const isPasswordType = outlinedInputRest.type === "password";
  const isNumericField = outlinedInputRest.inputMode === "numeric";
  const controlRef = outlinedInputRest?.inputRef;

  const [value, setValue] = useState<string>(() => externalValue || "");
  const [inputType, setInputType] = useState<InputSwitchType>("password");

  useEffect(() => {
    setValue((externalValue as string) || "");
  }, [externalValue]);

  const EndAdornment = useMemo(() => {
    if (isPasswordType) {
      const currentTypeIsText = inputType === "text";
      return (
        <IconButton
          onClick={() => setInputType(currentTypeIsText ? "password" : "text")}
          edge="end"
          sx={{
            "&:hover": { background: "transparent" },
          }}
        >
          {currentTypeIsText ? <EyeIcon /> : <EyeOffIcon />}
        </IconButton>
      );
    }
    if (limit) {
      return (
        <Typography
          className="inputfield__limit"
          color="gray.f7"
          variant="Reg_13"
          mt="auto"
          ml={1}
          mb={1}
        >
          {value?.length || 0}/{limit}
        </Typography>
      );
    }

    return outlinedInputRest.endAdornment;
  }, [isPasswordType, limit, outlinedInputRest.endAdornment, inputType, value?.length]);

  // ===LIMIT FEATURE=== //
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    if (!limit) return;
    const target = evt.target as HTMLInputElement;
    let { value: newValue } = target;
    if (limit && newValue.length > limit) {
      newValue = newValue.slice(0, limit);
    }
    externalOnChange?.(newValue);
    setValue(newValue);
  }
  //input with limit
  const handlePreventLimit = useCallback(
    function (evt: React.KeyboardEvent<HTMLInputElement>) {
      if (!limit) return;
      const target = evt.target as HTMLInputElement;
      const { value: newValue } = target;
      const isExcludedKey = functionKeys.includes(evt.keyCode);
      const isValidInput = newValue?.length <= limit;

      if (!isExcludedKey && !isValidInput) {
        evt.preventDefault();
      }
    },
    [limit]
  );
  //paste with limit
  const handlePaste = useCallback(
    function (evt: React.ClipboardEvent<HTMLInputElement>) {
      const target = evt.clipboardData.getData("text");

      if (limit && target.length > limit) {
        const newValue = target.slice(0, limit) || "";

        externalOnChange?.(newValue);
        setValue(newValue);

        evt.preventDefault();
      }
    },
    [externalOnChange, limit]
  );

  const withExternalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (limit) {
      handleChange(event);
    } else {
      externalOnChange?.(event.target.value);
      setValue(event.target.value);
    }
  };

  const Label = label && (
    <FormLabel
      // error={isFieldError}
      required={required}
      htmlFor={outlinedInputRest?.id}
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
      <OutlinedInput
        notched={false}
        autoComplete="off"
        inputRef={controlRef}
        endAdornment={EndAdornment}
        onPaste={limit ? undefined : outlinedInputRest.onPaste}
        value={value}
        onChange={outlinedInputRest.disabled ? () => {} : withExternalOnChange}
        inputProps={{
          ...inputProps,
          onPaste: limit ? handlePaste : undefined,
          onKeyDown: handlePreventLimit,
          ...(isNumericField && {
            onKeyPress: (event) => {
              //only accept input number
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            },
          }),
        }}
        sx={{
          ...(isSearch && { background: theme.palette.neutralLight[100] }),
        }}
        {...outlinedInputRest}
        type={isPasswordType ? inputType : outlinedInputRest.type}
      />
      {!hideHelper && !!helper && (
        <FormHelperText error={isFieldError} sx={{ marginLeft: 0 }} {...FormHelperTextProps}>
          {helper}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputFieldUI;
