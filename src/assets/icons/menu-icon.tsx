import { SvgIcon, SvgIconProps } from "@mui/material";

const MenuIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      role="img"
      viewBox="0 0 16 16"
      sx={{
        width: 16,
        height: 16,
        overflow: "hidden",
      }}
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 8.00016C2 7.63197 2.29848 7.3335 2.66667 7.3335H13.3333C13.7015 7.3335 14 7.63197 14 8.00016C14 8.36835 13.7015 8.66683 13.3333 8.66683H2.66667C2.29848 8.66683 2 8.36835 2 8.00016Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 4.00016C2 3.63197 2.29848 3.3335 2.66667 3.3335H13.3333C13.7015 3.3335 14 3.63197 14 4.00016C14 4.36835 13.7015 4.66683 13.3333 4.66683H2.66667C2.29848 4.66683 2 4.36835 2 4.00016Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12.0002C2 11.632 2.29848 11.3335 2.66667 11.3335H13.3333C13.7015 11.3335 14 11.632 14 12.0002C14 12.3684 13.7015 12.6668 13.3333 12.6668H2.66667C2.29848 12.6668 2 12.3684 2 12.0002Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
export default MenuIcon;
