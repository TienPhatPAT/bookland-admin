import { Grid, styled } from "@mui/material";

const w = {
  menu: {
    1: "253px",
    2: "80px",
  },
  outlet: {
    1: "calc(100% - 253px)",
    2: "calc(100% - 80px)",
  },
};
export const MainContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  display: flex;
`;
export interface StyledMenuProps {
  open?: boolean;
}

export const StyledMainMenuLeft = styled(Grid)<StyledMenuProps>`
  width: ${({ open }) => (open ? w.menu[1] : w.menu[2])};
  transition: width linear 0.1s;
`;

export const StyledMainMenuRight = styled(Grid)<StyledMenuProps>`
  width: ${({ open }) => (open ? w.outlet[1] : w.outlet[2])};
  transition: width linear 0.1s;
`;
