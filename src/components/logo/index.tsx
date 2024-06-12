import React from "react";
import { NavLink } from "react-router-dom";

import APP_IMG from "@/assets/images";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Logo = React.forwardRef<
  React.ElementRef<typeof NavLink>,
  React.ComponentPropsWithoutRef<typeof NavLink> & Props
>(({ href, ...props }, ref) => {
  return (
    <NavLink
      {...props}
      to={href || ""}
      ref={ref}
      data-testid="logo-test"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <img src={APP_IMG.ImageLogo} alt="Logo" width={150} />
    </NavLink>
  );
});

Logo.displayName = "Logo";

export default Logo;
