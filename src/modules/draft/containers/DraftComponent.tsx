import { ReactNode } from "react";

import { Box, Button, Stack } from "@mui/material";

import { NotifyService } from "@/helpers/notify";

interface GeneralComponentProps {
  name: string;
  note?: string;
  children: ReactNode;
}
function GeneralComponent({ name, note, children }: GeneralComponentProps) {
  return (
    <Box>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <h2>Component</h2>
        <span className="tag">{name}</span>
        <span>{note ? note : ""}</span>
      </Stack>
      <Stack direction="row" alignItems="center">
        {children}
      </Stack>
    </Box>
  );
}

const DraftComponents = () => {
  const showToast = () => {
    NotifyService.success("Success");
  };
  return (
    <div className="draft-page draft-palette">
      <h2>App Components</h2>
      <Stack gap={2} sx={{ width: "100%", paddingBottom: "80px" }}>
        <GeneralComponent name="SwitchControl">
          <Button variant="contained" onClick={showToast}>
            Open Drawer
          </Button>
        </GeneralComponent>
        {/* End */}
      </Stack>
    </div>
  );
};

export default DraftComponents;
