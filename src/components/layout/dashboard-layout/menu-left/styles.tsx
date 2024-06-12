import { Grid, List, Menu, Stack, styled } from "@mui/material";

import { theme } from "@/theme";

import { StyledMenuProps } from "../styles";

export const StyledContainerMenuLeft = styled(Grid)<StyledMenuProps>`
  height: 100%;
`;

export const StyledMenuTop = styled(Grid)<StyledMenuProps>`
  background-color: ${theme.palette.primary.main};
  height: 57px;
  display: flex;
  align-items: ${({ open }) => (open ? "inherit" : "center")};
  justify-content: space-between;
  color: ${theme.palette.white.light};
  padding: 20px;
`;

export const StyledMenuProfile = styled(Stack)`
  background-color: ${theme.palette.primary.contrastText};
  height: 51px;
  padding: 8px 15px;
`;

export const StyledMenuBottom = styled(Grid)`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 57px - 51px);
  color: ${theme.palette.neutralLight[600]};
  & .mui-cveggr-MuiListItemIcon-root {
    color: ${theme.palette.neutralLight[600]};
  }
`;

export const StyledList = styled(List)`
  padding: 4px 0px 4px 11px;
  & .MuiButtonBase-root {
    padding: 7px 10px 7px 11px;
    border-radius: 5px;
    margin-bottom: 5px;
    height: 38px;
    justify-content: flex-start;
  }

  & .MuiButtonBase-root .mui-cveggr-MuiListItemIcon-root {
    min-width: 38px;
  }

  .active {
    background-color: ${theme.palette.neutralLight[100]};
    color: ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.neutralLight[400]};
  }
  .active .MuiListItemIcon-root {
    color: ${theme.palette.primary.main};
  }
  .active_child {
    background-color: ${theme.palette.neutralLight[200]};
  }
`;

export const StyledMenu = styled(Menu)`
  & .MuiButtonBase-root {
    padding: 16px;
    width: 164px;
    height: 33px;
  }
  & .MuiList-root {
    padding: 0px;
  }
  & .MuiPaper-root {
  }
`;
