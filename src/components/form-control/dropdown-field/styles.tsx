import { MenuItem, styled, TextField } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)`
  padding: 9px 14px;
  &:hover {
    background-color: #f1f1f1;
  }
  &.Mui-selected,
  &:hover.Mui-selected {
    background-color: transparent;
  }
  & .MuiCheckbox-root {
    margin-right: 7px;
    padding: 0px;
    &:hover {
      background-color: transparent;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  padding: 10px 0px;
  font-size: 13px;
  font-weight: 400;
`;
