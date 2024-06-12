import { useEffect, useState } from "react";

import { Popup } from "@/models/dialog";

const actionTypes = {
  SHOW_DIALOG: "SHOW_DIALOG",
  HIDE_DIALOG: "HIDE_DIALOG",
} as const;

type ActionType = typeof actionTypes;

type Action = {
  type: ActionType["SHOW_DIALOG"] | ActionType["HIDE_DIALOG"];
  payload?: Partial<Popup>;
};

export const reducer = (state: Required<Popup>, action: Action): Required<Popup> => {
  switch (action.type) {
    case "SHOW_DIALOG":
      return {
        ...state,
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

let memoryState: Required<Popup> = {
  width: "401px",
  open: false,
  title: "",
  body: "",
  buttonActions: "",
  buttonText: "",
  data: null,
  closeCallback: () => {},
};

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listeners: Array<(_state: any) => void> = [];
const usePopup = () => {
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
  const show = (props: Partial<Popup>) =>
    dispatch({
      type: "SHOW_DIALOG",
      payload: props,
    });
  const hide = () => {
    state.closeCallback && state.closeCallback();
    dispatch({ type: "HIDE_DIALOG" });
  };
  const { data, ...rest } = state;
  return {
    data,
    state: rest,
    show,
    hide,
  };
};

export default usePopup;
