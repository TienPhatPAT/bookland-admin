import { SvgIcon, SvgIconProps } from "@mui/material";

const SortDefaultIcon = (props: SvgIconProps) => {
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
        d="M7.64244 1.90736C7.79334 1.71708 8.08897 1.71708 8.23988 1.90736L11.3916 5.88141C11.5824 6.12203 11.4057 6.47053 11.0929 6.47053L4.78942 6.47053C4.47658 6.47053 4.29987 6.12203 4.4907 5.88141L7.64244 1.90736Z"
        fill="currentColor"
      />
      <path
        d="M7.64244 12.7985C7.79334 12.9888 8.08897 12.9888 8.23988 12.7985L11.3916 8.82447C11.5824 8.58386 11.4057 8.23535 11.0929 8.23535L4.78942 8.23535C4.47658 8.23535 4.29987 8.58386 4.4907 8.82447L7.64244 12.7985Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default SortDefaultIcon;
