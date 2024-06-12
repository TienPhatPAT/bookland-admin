import { Backdrop, CircularProgress, Theme } from "@mui/material";

interface Props {
  isLoading?: boolean;
}
const GlobalLoader = ({ isLoading = false }: Props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoader;
