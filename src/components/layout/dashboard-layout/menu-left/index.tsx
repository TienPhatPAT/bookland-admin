import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import useAuth from "@/hooks/auth/useAuth";
import ChangePasswordDialog from "@/components/dialog/change-password-dialog";
import usePopup from "@/components/dialog/use-popup";

import { theme } from "@/theme";
import { MenuIcon, MoreHorizontalIcon } from "@/assets/icons";

import { IMenuItem, Menus, routeIsActive } from "./constant";
import {
  StyledContainerMenuLeft,
  StyledList,
  StyledMenu,
  StyledMenuBottom,
  StyledMenuProfile,
  StyledMenuTop,
} from "./styles";

const MenuLeft = () => {
  // const isOpen = useAppSelector(globalSelector.isOpenMenu)
  const [openAccounts, setOpenAccounts] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const menuNav: IMenuItem[] = Menus();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const pathname = location.pathname;
  const popup = usePopup();
  const { logout } = useAuth();

  const onOpenPopup = () => {
    popup.show({
      width: "401px",
      title: "",
      body: <ChangePasswordDialog />,
    });
    handleCloseMore();
  };

  const handleClick = (txt: string | undefined) => {
    switch (txt) {
      case "Accounts":
        setOpenAccounts(!openAccounts);
        break;
      case "Product":
        setOpenProduct(!openProduct);
        break;
    }
  };

  const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const renderExpandIcon = (label: string) => {
    if (label === "Accounts") {
      return openAccounts ? <ExpandLess /> : <ExpandMore />;
    } else {
      return openProduct ? <ExpandLess /> : <ExpandMore />;
    }
  };

  const getCollapseInState = (label: string) => {
    if (label === "Accounts") {
      return openAccounts;
    } else {
      return openProduct;
    }
  };

  return (
    <StyledContainerMenuLeft open={true}>
      <StyledMenuTop open={true}>
        <Typography variant="Bold_14">BookLand</Typography>
        <MenuIcon />
      </StyledMenuTop>
      <StyledMenuBottom>
        {menuNav.map((menu, idx) => (
          <StyledList key={menu.title}>
            {idx !== 0 && <Typography variant="Order_12">{menu.title}</Typography>}
            {menu.items.map((item) => {
              if (item.child) {
                return (
                  <div key={item.path}>
                    <ListItemButton onClick={() => handleClick(item.label)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                      {renderExpandIcon(item.label)}
                    </ListItemButton>
                    <Collapse in={getCollapseInState(item.label)} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.child.map((child) => (
                          <ListItemButton
                            key={child.path}
                            className={routeIsActive(pathname, child) ? "active_child" : ""}
                            sx={{
                              pl: "49px !important",
                            }}
                            component={NavLink}
                            to={child.path}
                          >
                            <Typography variant="Reg_14">{child.label}</Typography>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                );
              } else {
                return (
                  <ListItemButton
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    className={routeIsActive(pathname, item) ? "active" : ""}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <Typography variant="Reg_14">{item.label}</Typography>
                  </ListItemButton>
                );
              }
            })}
          </StyledList>
        ))}
      </StyledMenuBottom>
      <StyledMenuProfile direction="row" justifyContent="space-between">
        <Stack spacing={1.5} direction="row" alignItems="center">
          <Avatar alt="avatar_profile" src="" sx={{ width: 36, height: 36 }}>
            A
          </Avatar>
          <Typography variant="Reg_14">Admin</Typography>
        </Stack>
        <IconButton sx={{ p: "8px 6px" }} onClick={handleClickMore} aria-label="more">
          <MoreHorizontalIcon />
        </IconButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMore}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem onClick={onOpenPopup}>
            <Typography variant="Reg_13">Change Password</Typography>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Typography variant="Reg_13" color={theme.palette.red[500]}>
              Logout
            </Typography>
          </MenuItem>
        </StyledMenu>
      </StyledMenuProfile>
    </StyledContainerMenuLeft>
  );
};
export default MenuLeft;
