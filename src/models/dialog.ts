/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface DialogConfirm {
  open?: boolean;
  title: string;
  description?: ReactNode;
  callbackYes?: any;
  hideNoButton?: boolean;
  callbackNo?: any;
  noText?: string;
  yesText?: string;
  color?: string;
}

export interface DrawerRight {
  open?: boolean;
  title: string;
  body?: ReactNode;
  buttonActions?: ReactNode;
  buttonText?: string;
  data: any | null;
  size: "md" | "lg" | "xl";
  closeCallback: () => void;
}

export interface Popup {
  width?: string;
  open?: boolean;
  title: string;
  body?: ReactNode;
  buttonActions?: ReactNode;
  buttonText?: string;
  data: any | null;
  closeCallback: () => void;
}
