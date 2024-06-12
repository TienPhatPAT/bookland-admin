import { SvgIcon, SvgIconProps } from "@mui/material";

const SortUpIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      role="img"
      viewBox="0 0 15 15"
      sx={{
        width: 15,
        height: 15,
        overflow: "hidden",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M7.69224 1.90736C7.818 1.71708 8.06436 1.71708 8.19011 1.90736L10.8166 5.88141C10.9756 6.12203 10.8283 6.47053 10.5676 6.47053L5.31473 6.47053C5.05403 6.47053 4.90677 6.12203 5.06579 5.88141L7.69224 1.90736Z"
        fill="#FA5E92"
      />
    </SvgIcon>
  );
};

export default SortUpIcon;
