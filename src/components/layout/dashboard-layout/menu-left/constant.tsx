import React from "react";

import { APP_ROUTES } from "@/routers/routes";

import { AccountsIcon, BookIcon } from "@/assets/icons";

export interface IMenuItem {
  title: string;
  items: Item[];
}

interface Item {
  label: string;
  icon?: React.ReactNode;
  path: string;
  child?: Item[];
}

export const Menus = () => [
  {
    title: "Main",
    items: [
      {
        label: "Books",
        icon: <BookIcon />,
        path: APP_ROUTES.DASHBOARD.CATEGORY.to,
      },
      {
        label: "Users",
        icon: <AccountsIcon />,
        path: APP_ROUTES.DASHBOARD.USER.to,
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const routeIsActive = (pathname: string, route: Item): boolean => {
  return pathname == route.path;
  //  || pathname.indexOf(route.path) === 0;
};
