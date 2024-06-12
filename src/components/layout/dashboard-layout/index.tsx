import { Outlet } from "react-router-dom";

import MenuLeft from "./menu-left";
import { MainContainer, StyledMainMenuLeft, StyledMainMenuRight } from "./styles";

function DashboardLayout() {
  return (
    <MainContainer>
      <StyledMainMenuLeft open={true}>
        <MenuLeft />
      </StyledMainMenuLeft>
      <StyledMainMenuRight open={true}>
        <Outlet />
      </StyledMainMenuRight>
    </MainContainer>
  );
}

export default DashboardLayout;
