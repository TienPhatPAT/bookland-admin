import { Outlet } from "react-router-dom";

import { WrapperAuthStyled } from "./styles";

const AuthLayout = () => {
  return (
    <WrapperAuthStyled>
      <Outlet />
    </WrapperAuthStyled>
  );
};

export default AuthLayout;
