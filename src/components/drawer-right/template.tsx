import { publish } from "@/utils/event";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { EAction } from "@/constants/event";

import { CloseIcon } from "@/assets/icons";

import { StyledDrawer } from "./styles";
import useDrawerRight from "./use-drawer";

export const TemplateDrawer = () => {
  const { state, hide } = useDrawerRight();
  return (
    <StyledDrawer
      open={state.open}
      size={state.size}
      anchor="right"
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        component={Stack}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="popup_title"
      >
        <Typography variant="Reg_16">{state.title}</Typography>
        <IconButton onClick={hide}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>{state.open && state.body}</DialogContent>
      <Divider />
      <DialogActions>
        {state.buttonText && (
          <Button onClick={() => publish(EAction.MAIN, null)} fullWidth variant="contained">
            {state.buttonText}
          </Button>
        )}
        {!state.buttonText && state.buttonActions}
      </DialogActions>
    </StyledDrawer>
  );
};
