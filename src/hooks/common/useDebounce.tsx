/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import _ from "lodash";

import useIsMountedRef from "./useIsMountedRef";

export function useDebounce(cb: any, delay: number) {
  const options = {
    leading: false,
    trailing: true,
  };
  const inputsRef = useRef(cb);
  const isMounted = useIsMountedRef();
  useEffect(() => {
    inputsRef.current = { cb, delay };
  });

  return useMemo(
    () =>
      _.debounce(
        (...args) => {
          if (inputsRef.current.delay === delay && isMounted) inputsRef.current.cb(...args);
        },
        delay,
        options
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay, _.debounce]
  );
}

export default useDebounce;
