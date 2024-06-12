/* eslint-disable @typescript-eslint/ban-types */
import { transientOptions } from "@/utils/transientOptions";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";

import { Box, css, OutlinedInput, styled } from "@mui/material";

import { theme } from "@/theme";

interface InputContainerProps {
  $error?: boolean;
  $disabled?: boolean;
}
export const InputContainer = styled(Box, transientOptions)<InputContainerProps & {}>`
  display: flex;
  height: 48px;
  border-radius: 5px;
  background: ${theme.palette.backgrounds.primary};
  border: 1px solid ${theme.palette.neutralDark[900]};
  ${({ $error }) =>
    $error &&
    css`
      border: 1px solid ${theme.palette.red[500]};
    `}
  ${({ $disabled }) =>
    $disabled &&
    css`
      background: ${theme.palette.backgrounds.tertiary};
    `}
`;

export const StyledInput = styled(OutlinedInput)`
  background: transparent;
  border: none;
  height: 100%;
  &:hover .MuiOutlinedInput-notchedOutline,
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  &.Mui-readOnly,
  &.Mui-disabled {
    background: transparent;
  }
  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiOutlinedInput-input {
    padding-left: 9px;
  }
`;

export const BasePhoneInput = styled(
  ({ className, ...rest }: PhoneInputProps & { className?: string }) => (
    <PhoneInput containerClass={className} {...rest} />
  )
)<{}>`
  &.react-tel-input {
    min-width: 54px !important;
    width: 54px !important;
    display: flex !important;
    border-right: 1px solid ${theme.palette.neutralDark[900]} !important;
    .form-control {
      border-radius: 0 !important;
      border: none !important;
      background: transparent !important;
      padding: 5px 5px 5px 16px !important;
      width: 100% !important;
      font-size: 14px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 16px !important; /* 114.286% */
      letter-spacing: 0.25px !important;
      color: ${theme.palette.label.primary} !important;
      &::placeholder {
        font-size: 14px !important;
        font-style: normal !important;
        font-weight: 400 !important;
        line-height: 16px !important; /* 114.286% */
        letter-spacing: 0.25px !important;
        color: #e5e5ea !important;
      }
    }
    .flag-dropdown {
      width: 100% !important;
      .selected-flag {
        width: auto !important;
        padding: 0 !important;
        border-radius: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        /* padding-right: 9px !important; */
        .flag {
          margin: 0 !important;
          top: 0 !important;
          position: unset !important;
          width: 16px !important;
          height: 16px !important;
          .arrow {
            left: 0 !important;
            border: none !important;
            width: 16px !important;
            height: 16px !important;
            top: auto !important;
            margin: 0 !important;
            position: unset !important;
            .up {
              transform: rotate(180deg) !important;
            }
          }
          background: transparent !important;
        }
      }
    }
  }
`;

export const StyledPhoneInput = styled(
  ({ className, ...rest }: PhoneInputProps & { className?: string }) => (
    <BasePhoneInput dropdownClass={className} {...rest} />
  )
)``;
