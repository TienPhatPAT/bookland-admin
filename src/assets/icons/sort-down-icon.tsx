import { SvgIcon, SvgIconProps } from "@mui/material";

const SortDownIcon = (props: SvgIconProps) => {
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
        d="M7.64244 12.7985C7.79334 12.9888 8.08897 12.9888 8.23988 12.7985L11.3916 8.82447C11.5824 8.58386 11.4057 8.23535 11.0929 8.23535L4.78942 8.23535C4.47658 8.23535 4.29987 8.58386 4.4907 8.82447L7.64244 12.7985Z"
        fill="#FA5E92"
      />
    </SvgIcon>
  );
};

export default SortDownIcon;
