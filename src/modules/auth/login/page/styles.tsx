import { Box, styled, Typography } from "@mui/material";

export const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 401px;
  border-radius: 25px;
  background-color: ${(p) => p.theme.palette.backgrounds.primary};
  box-shadow: 0px 4px 26px 0px #00000029;
  padding: 67px 42px 27px;
`;

export const Title = styled(Typography)`
  color: ${(p) => p.theme.palette.black.main};
  display: inline-block;
  font-size: 16px;
  margin: 34px auto 36px;
  font-weight: 700;
  margin: 34px auto 36px;
  line-height: 100%;
`;
