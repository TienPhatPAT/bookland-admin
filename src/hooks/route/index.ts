import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";

import { createQueryString, parseURL } from "@/helpers/functions";

export interface IOptionRoute extends NavigateOptions {
  ids?: (string | number)[];
  params?: object;
  type?: "string" | "void";
  enableSearch?: boolean;
  holdSearch?: boolean;
}

export const replace_list = (path: string) => {
  return path.split("/").filter((p) => p.includes(":"));
};

export default function useRoute() {
  const navigate = useNavigate();
  const { search, state } = useLocation();

  /**
   * function 1
   * @param path route
   */
  function route(path: string, options?: IOptionRoute): void | string;

  /**
   * function 2
   * @param path route with 1 :id
   * @param id
   */
  function route(path: string, id: string | number, options?: IOptionRoute): void | string;

  /**
   * function 3
   * @param path route with more than 1 :id
   * @param ids ordered list of ids
   */
  function route(path: string, ids: string[] | number[], options?: IOptionRoute): void | string;

  /**
   * function 4
   * @param path number
   */
  function route(path: number): void;

  /**
   * implement function overload route
   * @returns
   */
  // eslint-disable-next-line complexity
  function route(
    path: string | number,
    id_options?: string | number | string[] | number[] | IOptionRoute,
    options?: IOptionRoute
  ): void | string {
    // function 4
    if (typeof path === "number") {
      navigate(path);
      return;
    }

    // others remaining function
    let path_custom = path;
    let path_search: string | undefined = undefined;
    const {
      ids = [],
      params,
      type = "void",
      enableSearch = true,
      ...other_options
    } = typeof id_options === "object" && !Array.isArray(id_options) ? id_options : options || {};

    // function 1
    // dont do anything

    if (id_options) {
      const replaces = replace_list(path);

      // function 2
      if (typeof id_options === "string" || typeof id_options === "number") {
        path_custom = path_custom.replace(replaces[0], `${id_options}`);
      }

      if (typeof id_options === "object") {
        // function 3 id_options
        // function 1 ids
        const id_list = Array.isArray(id_options) ? id_options : ids;

        replaces.forEach((rep, index) => {
          path_custom = path_custom.replace(rep, `${id_list[index]}`);
        });
      }
    }

    if (params) {
      path_search = createQueryString(params);
    }

    // callback search query
    if (enableSearch) {
      // set search param to state of location
      if (search) {
        other_options.state = { search: parseURL(search) };
      }
      // use search param from state to search of location
      if (state) {
        path_search = createQueryString(state.search);
      }
    }

    if (type === "void") navigate({ pathname: path_custom, search: path_search }, other_options);
    // return link without search param
    else if (type === "string") return path_custom;
  }

  const routeButton =
    (
      path: string,
      id?: string | number | string[] | number[] | IOptionRoute,
      options?: IOptionRoute
    ) =>
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (id) route(path, id as any, options);
      else route(path, options);
    };

  return { route, routeButton };
}
