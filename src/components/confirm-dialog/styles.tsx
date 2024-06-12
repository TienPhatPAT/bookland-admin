import { Button, Dialog, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 24px !important;
    width: 400px;
  }
  .MuiDialogTitle-root {
    padding: 0px;
  }
  .MuiDialogContent-root {
    padding: 0px;
  }
  .MuiDialogActions-root {
    padding: 0px;
    margin-top: 24px;
  }
`;

export const StyledDeleteButton = styled(Button)`
  /* background-color: ${(p) => p.theme.palette.red[500]}; */
`;

export const StyledCancelButton = styled(Button)`
  color: ${(p) => p.theme.palette.neutralLight[500]};
  border: 1px solid ${(p) => p.theme.palette.neutralLight[500]};
  &:hover {
    border: 1px solid ${(p) => p.theme.palette.neutralLight[500]};
  }
`;
