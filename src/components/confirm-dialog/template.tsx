/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { Box, Stack, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { theme } from "@/theme";
import { ConfirmIcon } from "@/assets/icons";

import { StyledCancelButton, StyledDeleteButton, StyledDialog } from "./styles";
import useDialogConfirm from "./use-dialog-confirm";

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog() {
  const { state, hide } = useDialogConfirm();

  return (
    <React.Fragment>
      <StyledDialog
        open={state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={hide}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Box sx={{ color: state.color, mb: 2 }}>
              <ConfirmIcon />
            </Box>
            <Typography variant="Order_18" fontWeight={600}>
              {state.title}
            </Typography>
            <DialogContentText id="alert-dialog-slide-description">
              {state.description}
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledCancelButton
            variant="outlined"
            fullWidth
            onClick={() => {
              state.callbackNo();
              hide();
            }}
          >
            {state.noText}
          </StyledCancelButton>

          <StyledDeleteButton
            fullWidth
            variant="contained"
            color={state.color === theme.palette.red[500] ? "error" : "primary"}
            onClick={() => {
              state.callbackYes();
              hide();
            }}
          >
            {state.yesText}
          </StyledDeleteButton>
        </DialogActions>
      </StyledDialog>
    </React.Fragment>
  );
}
