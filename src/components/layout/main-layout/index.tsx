/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children } from "react";

import { Stack } from "@mui/material";

import { theme } from "@/theme";

interface MainLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
}
const Mainlayout = ({ children }: MainLayoutProps) => {
  let _body, _title;

  Children.forEach(children, (child) => {
    if (child.type === Header) {
      return (_title = child);
    }

    if (child.type === Content) {
      return (_body = child);
    }
  });

  return (
    <Stack
      className="panel"
      sx={{
        height: "100vh",
      }}
    >
      <Stack
        className="header"
        sx={{
          background: theme.palette.backgrounds.primary,
          padding: "8px",
          borderBottom: "1px solid",
          borderColor: theme.palette.neutralLight[400],
        }}
      >
        {_title}
      </Stack>
      <Stack
        className="content"
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "16px",
          background: theme.palette.neutralLight[100],
        }}
      >
        <Stack
          sx={{
            overflow: "auto",
            background: "transparent",
            flex: 1,
          }}
        >
          {_body}
        </Stack>
      </Stack>
    </Stack>
  );
};

const Header = ({ children }: { children: React.JSX.Element }) => children;
const Content = ({ children }: { children: React.JSX.Element }) => children;

Mainlayout.Header = Header;
Mainlayout.Body = Content;

export default Mainlayout;
