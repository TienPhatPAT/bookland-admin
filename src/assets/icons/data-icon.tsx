import { SvgIcon, SvgIconProps } from "@mui/material";

const DataIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      role="img"
      viewBox="0 0 24 24"
      sx={{
        width: 24,
        height: 24,
        overflow: "hidden",
      }}
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C3.44772 4 3 4.44772 3 5V15C3 15.5523 3.44772 16 4 16H20C20.5523 16 21 15.5523 21 15V5C21 4.44772 20.5523 4 20 4H4ZM1 5C1 3.34315 2.34315 2 4 2H20C21.6569 2 23 3.34315 23 5V15C23 16.6569 21.6569 18 20 18H4C2.34315 18 1 16.6569 1 15V5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 21C7 20.4477 7.44772 20 8 20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16C12.5523 16 13 16.4477 13 17V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V17C11 16.4477 11.4477 16 12 16Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
export default DataIcon;
