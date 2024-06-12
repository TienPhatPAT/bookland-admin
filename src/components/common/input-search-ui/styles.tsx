import { styled } from "@mui/material";

import InputFieldUI from "@/components/form-control/input-field/ui";

import { theme } from "@/theme";

export const StyledInputSearch = styled(InputFieldUI)`
  width: 369px;
  height: 41px;
  background-color: ${theme.palette.neutralLight[100]};
  border: ${theme.palette.neutralDark[900]};
  & *:hover {
    border: ${theme.palette.neutralDark[900]};
  }
  color: ${theme.palette.neutralDark[900]};
`;
