/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { DrawerRight } from "@/models/dialog";

const actionTypes = {
  SHOW_DRAWER: "SHOW_DRAWER",
  HIDE_DRAWER: "HIDE_DRAWER",
} as const;
//
type ActionType = typeof actionTypes;

type Action = {
  type: ActionType["SHOW_DRAWER"] | ActionType["HIDE_DRAWER"];
  payload?: Partial<DrawerRight>;
};

export const reducer = (state: Required<DrawerRight>, action: Action): Required<DrawerRight> => {
  switch (action.type) {
    case "SHOW_DRAWER":
      return {
        ...state,
        ...action.payload,
        open: true,
      };

    case "HIDE_DRAWER":
      return {
        ...state,
        ...action.payload,
        size: "md",
        open: false,
      };
  }
};

let memoryState: Required<DrawerRight> = {
  open: false,
  title: "",
  body: "",
  buttonActions: "",
  buttonText: "",
  data: null,
  size: "md",
  closeCallback: () => {},
};

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

const listeners: Array<(_state: any) => void> = [];
const useDrawerRight = () => {
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
  const show = (props: Partial<DrawerRight>) =>
    dispatch({
      type: "SHOW_DRAWER",
      payload: props,
    });
  const hide = () => {
    state.closeCallback && state.closeCallback();
    dispatch({ type: "HIDE_DRAWER" });
  };
  const { data, ...rest } = state;
  return {
    data,
    state: rest,
    show,
    hide,
  };
};

export default useDrawerRight;
