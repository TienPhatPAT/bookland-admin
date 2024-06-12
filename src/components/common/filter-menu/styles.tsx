import { Button, buttonClasses, InputBase, Menu, styled } from "@mui/material";

import { theme } from "@/theme";

export const StyledFilterButton = styled(Button)`
  background: ${theme.palette.neutralLight[200]};
  border: 1px solid ${theme.palette.neutralLight[400]};
  border-radius: 5px;
  box-shadow: none;
  color: ${theme.palette.neutralDark[500]};
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-transform: none;
  padding: 0 16px 10px;
  height: 41px;
  align-items: flex-end;

  &:hover {
    background: ${theme.palette.neutralLight[200]};
    border: 1px solid ${theme.palette.neutralLight[600]};
    border-radius: 5px;
    box-shadow: none;
  }
  & .${buttonClasses.startIcon} {
    margin-right: 3px;
  }
`;

export const StyledFilterMenu = styled(Menu)`
  & .MuiList-padding {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  & .filter_body {
    width: 319px;
    padding: 14px 22px 25px 23px;
    flex-direction: column;
    align-items: flex-start;
  }
  & .filter_body:hover {
    background-color: ${theme.palette.neutralLight.main};
  }
`;

export const StyledInputText = styled(InputBase)`
  color: #000;
  font-size: 13px;
  line-height: 100%;
  border: 1px solid #d5d5d5;
  width: 100%;
  height: 38px;
  background: #fff;
  border-radius: 5px;
  padding: 13px 10px;
`;
