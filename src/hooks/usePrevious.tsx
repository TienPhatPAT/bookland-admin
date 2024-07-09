/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

function usePrevious<T extends any>(value: any): T {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current as T; //in the end, return the current ref value.
}
export default usePrevious;
