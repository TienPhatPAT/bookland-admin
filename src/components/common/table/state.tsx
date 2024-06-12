/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, useContext, useReducer } from "react";

interface TableProps {
  pageSize: number;
  pageIndex: number;
  pageTotal: number;
  rowTotal: number;
  sortField: string;
  isAsc: boolean;
  [key: string]: any;
}

interface PayloadAction {
  type: "UPDATE" | "RESET";
  payload?: Partial<TableProps>;
}
// Step 1: Define a context
const TableContext = createContext<TableProps>({} as any);

const TableDispatchContext = createContext<Dispatch<PayloadAction>>(null as any);

// Step 2: Define a reducer function
export const reducer = (state: any, action: PayloadAction) => {
  switch (action.type) {
    case "UPDATE":
      state = { ...state, ...action.payload };
      return { ...state };
    case "RESET":
      return {
        pageSize: 25,
        pageIndex: 0,
        pageTotal: 0,
        rowTotal: 0,
        sortField: "",
        isAsc: false,
      };
    default:
      return { ...state };
  }
};

/* Step 3: Create a component that provides the
context and manages state with useReducer
*/
export const TableProvider = ({ children }: any) => {
  const initialState = {
    pageSize: 25,
    pageIndex: 0,
    pageTotal: 0,
    rowTotal: 0,
    sortField: "",
    isAsc: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TableContext.Provider value={state}>
      <TableDispatchContext.Provider value={dispatch}>{children}</TableDispatchContext.Provider>
    </TableContext.Provider>
  );
};

// Step 4: Create a custom
// hook to access the context
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(`useTable must be used
                      within a TableProvider`);
  }
  return context;
};

export const useTableDispatch = () => {
  const context = useContext(TableDispatchContext);
  if (!context) {
    throw new Error(`useTableDispatch must be used
                      within a TableProvider`);
  }
  return context;
};
