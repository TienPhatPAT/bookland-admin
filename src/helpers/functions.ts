// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { InitialQuery } from "@/models/query";

const parseKeyObj = (key: string) => {
  const [parent, child] = key.split("[");
  return { parent, child: child?.slice(0, child.length - 1) };
};

/**
 * Used in conjunction with the `createQueryString` function to convert from `string`
 * in query form
 *
 * @param url
 * @param options
 * @returns
 */
export const parseURL = (
  url: string,
  options?: { arrayField?: string[]; objectField?: string[] }
) => {
  const { arrayField = ["fields"], objectField = ["filter"] } = options || {};

  const search = new URLSearchParams(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const param: any = { ...InitialQuery };

  for (const key of search.keys()) {
    const val = search.get(key)?.toString();

    if (arrayField.includes(key)) {
      if (!param[key]) param[key] = [val];
      else param[key].push(val);
    } else if (objectField.some((item) => key.includes(item))) {
      const { parent, child } = parseKeyObj(key);
      if (!param[parent]) param[parent] = { [child]: val };
      else param[parent][child] = val;
    } else {
      param[key] = val;
    }
  }
  return param;
};

/**
 * Used with `parseURL` to convert query to string
 *
 * @param query
 * @returns
 */
export const createQueryString = (query: object) => {
  const openBracket = encodeURIComponent("[");
  const closeBracket = encodeURIComponent("]");

  return Object.keys(query || {})
    .map((key: string) => {
      const val = query[key];
      if (val !== null && typeof val === "object") {
        if (Array.isArray(val)) {
          return val.map((arr) => `${key}=${encodeURIComponent(arr)}`).join("&");
        } else {
          return Object.entries(val)
            .map(
              // eslint-disable-next-line
              ([objKey, objVal]: [string, any]) =>
                `${key}${openBracket}${objKey}${closeBracket}=${encodeURIComponent(objVal)}`
            )
            .join("&");
        }
      }
      return `${key}=${encodeURIComponent(val)}`;
    })
    .join("&");
};

export const formatRejectError = (error: IError): string | undefined => {
  if (!Array.isArray(error.error)) return error.error;

  return `${error.error[0]?.field}: ${error.error[0]?.message}`;
};
