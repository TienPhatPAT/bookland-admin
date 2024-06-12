import { Dialog, styled } from "@mui/material";

export interface StyledDialogProps {
  width: string;
}

export const StyledDialog = styled(Dialog)<StyledDialogProps>`
  & .MuiDialog-paper {
    width: ${({ width }) => width};
  }
  & .popup_title {
    padding: 17px 24px 16px 24px;
  }
  & .MuiDialogContent-root {
    padding: 0px 24px 36px;
  }
`;
