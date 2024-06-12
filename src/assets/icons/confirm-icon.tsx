import { SvgIcon, SvgIconProps } from "@mui/material";

const ConfirmIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      role="img"
      viewBox="0 0 40 40"
      sx={{
        width: 40,
        height: 40,
        overflow: "hidden",
      }}
      fill="none"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="currentColor" opacity={0.3} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11ZM9 20C9 13.9249 13.9249 9 20 9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31C13.9249 31 9 26.0751 9 20Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 15C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20V16C19 15.4477 19.4477 15 20 15Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 24C19 23.4477 19.4477 23 20 23H20.01C20.5623 23 21.01 23.4477 21.01 24C21.01 24.5523 20.5623 25 20.01 25H20C19.4477 25 19 24.5523 19 24Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default ConfirmIcon;
