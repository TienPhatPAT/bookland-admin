/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { DialogContent, DialogTitle, IconButton, Slide, Stack, Typography } from "@mui/material";

import { CloseIcon } from "@/assets/icons";

import { StyledDialog } from "./styles";
import usePopup from "./use-popup";

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const TemplateDialog = () => {
  const { state, hide } = usePopup();
  return (
    <StyledDialog
      maxWidth="xl"
      width={state.width}
      open={state.open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      TransitionComponent={Transition}
    >
      <DialogTitle
        component={Stack}
        direction="row"
        justifyContent={state.title ? "space-between" : "flex-end"}
        alignItems="center"
        className="popup_title"
      >
        {state.title && <Typography variant="Reg_16">{state.title}</Typography>}
        <IconButton sx={{ p: 0 }} onClick={hide}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{state.open && state.body}</DialogContent>
    </StyledDialog>
  );
};
