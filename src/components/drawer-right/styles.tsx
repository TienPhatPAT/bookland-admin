import { Drawer, DrawerProps, styled } from "@mui/material";

interface MyDrawerProps extends DrawerProps {
  size: "md" | "lg" | "xl"; // Define allowed size values
}
const drawerWidth = {
  md: 523,
  lg: 768,
  xl: 1024,
};

export const StyledDrawer = styled(Drawer)<MyDrawerProps>`
  & .MuiDrawer-paper {
    width: ${({ size }) => drawerWidth[size] || drawerWidth.lg}px;
  }
  & .popup_title {
    padding: 10px 25px 7px 25px;
  }
  & .MuiDialogContent-root {
    padding: 24px;
  }
`;
