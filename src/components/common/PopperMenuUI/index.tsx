import { ReactNode } from "react";

import { Fade } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper, { PaperProps } from "@mui/material/Paper";
import Popper, { PopperProps } from "@mui/material/Popper";

interface PopperMenuUIProps extends PopperProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  paperProps?: PaperProps;
}

export default function PopperMenuUI({
  children,
  open,
  onClose,
  anchorEl,
  paperProps,
  ...rest
}: PopperMenuUIProps) {
  return (
    <Popper open={open} anchorEl={anchorEl} {...rest}>
      <ClickAwayListener onClickAway={onClose}>
        <Fade timeout={200} in={open}>
          <Paper {...paperProps}>{children}</Paper>
        </Fade>
      </ClickAwayListener>
    </Popper>
  );
}
