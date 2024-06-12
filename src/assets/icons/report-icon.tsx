import { SvgIcon, SvgIconProps } from "@mui/material";

const ReportIcon = (props: SvgIconProps) => {
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
        d="M3.87868 1.87868C4.44129 1.31607 5.20435 1 6 1H14.5C14.7652 1 15.0196 1.10536 15.2071 1.29289L20.7071 6.79289C20.8946 6.98043 21 7.23478 21 7.5V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H6C5.20435 23 4.44129 22.6839 3.87868 22.1213C3.31607 21.5587 3 20.7957 3 20V4C3 3.20435 3.31607 2.44129 3.87868 1.87868ZM6 3C5.73478 3 5.48043 3.10536 5.29289 3.29289C5.10536 3.48043 5 3.73478 5 4V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V7.91421L14.0858 3H6Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 1C14.5523 1 15 1.44772 15 2V7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V2C13 1.44772 13.4477 1 14 1Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9C7 8.44772 7.44772 8 8 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H8C7.44772 10 7 9.55228 7 9Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
export default ReportIcon;
