/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { DialogConfirm } from "@/models/dialog";

import { theme } from "@/theme";

const actionTypes = {
  SHOW_DIALOG: "SHOW_DIALOG",
  HIDE_DIALOG: "HIDE_DIALOG",
} as const;

type ActionType = typeof actionTypes;

type Action = {
  type: ActionType["SHOW_DIALOG"] | ActionType["HIDE_DIALOG"];
  payload?: Partial<DialogConfirm>;
};

export const reducer = (
  state: Required<DialogConfirm>,
  action: Action
): Required<DialogConfirm> => {
  switch (action.type) {
    case "SHOW_DIALOG":
      return {
        ...state,
        hideNoButton: false,
        ...action.payload,
        open: true,
      };

    case "HIDE_DIALOG":
      return {
        ...state,
        ...action.payload,
        open: false,
      };
  }
};

let memoryState: Required<DialogConfirm> = {
  open: false,
  title: "",
  description: "",
  hideNoButton: false,
  callbackYes: () => {},
  callbackNo: () => {},
  noText: "Cancel",
  yesText: "Delete",
  color: theme.palette.red[500],
};

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

const listeners: Array<(state: any) => void> = [];
const useDialogConfirm = () => {
  const [state, setState] = useState(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  const show = (props: Partial<DialogConfirm>) =>
    dispatch({
      type: "SHOW_DIALOG",
      payload: props,
    });
  const hide = () => dispatch({ type: "HIDE_DIALOG" });
  return {
    state,
    show,
    hide,
  };
};

export default useDialogConfirm;
