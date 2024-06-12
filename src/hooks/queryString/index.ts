import { useEffect, useState } from "react";
import * as _ from "lodash";
import { useLocation } from "react-router-dom";

import { FilterValue } from "@/models/common";
import { InitialQuery, IQueryString } from "@/models/query";
import { parseURL } from "@/helpers/functions";
import { useTableDispatch } from "@/components/common/table/state";

import useRoutes from "../route";

export const useQueryString = (options?: { init?: IQueryString; unabledParam?: boolean }) => {
  const { init = InitialQuery, unabledParam = false } = options || {};
  const location = useLocation();
  const { route } = useRoutes();
  const dispatch = useTableDispatch();
  const [query, setQuery] = useState<IQueryString>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !unabledParam && location.search ? (parseURL(location.search) as any) : init
  );
  // search
  const onSearchHandler = _.debounce((e: React.ChangeEvent<HTMLInputElement> | string = "") => {
    let value = "";
    if (typeof e === "string") value = e;
    else value = e.target.value.toString();
    const newQuery = _.cloneDeep(query);
    newQuery.search = value;
    newQuery.page = 1;
    if (unabledParam) newQuery.reset = true;
    if (newQuery.search === "") delete newQuery.search;
    setQuery(newQuery);
  }, 400);

  // sort
  const onChangeSort = (state: {
    sort_by: string;
    sort_direction: string;
    accessorKey?: string;
    sortUndefined?: 1 | -1 | undefined;
  }) => {
    const { sort_by, sort_direction } = state;
    const newQuery = _.cloneDeep(query);

    if (state.sortUndefined === -1) {
      // delete newQuery.sortBy;
      delete newQuery.sort;
    } else {
      newQuery.sort = sort_direction === "asc" ? sort_by : `-${sort_by}`;
      // newQuery.orderBy = sort_direction;
    }
    if (newQuery.search === "") delete newQuery.search;
    setQuery(newQuery);
  };

  const checkSort = (name: string) => {
    const isCheck = name.includes("-");
    if (isCheck) {
      return {
        sortField: name.replace("-", ""),
        isAsc: false,
      };
    }

    return {
      sortField: name,
      isAsc: true,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeItemsFromObject = (query: Record<string, any>, filter: Record<string, any>): any => {
    const filtered = { ...query }; // Create a copy of query to avoid mutation
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filtered, key)) {
        delete filtered[key]; // Delete properties from query that exist in filter
      }
    }
    return filtered;
  };

  // filter
  const setFilter = (param: Partial<IQueryString>, clearFilter?: FilterValue | undefined) => {
    if (clearFilter) {
      const clear = removeItemsFromObject(query, clearFilter);
      setQuery({ ...clear });
    } else {
      setQuery({ ...query, ...param, page: 1 });
    }
  };

  useEffect(() => {
    if (!unabledParam)
      route(location.pathname, {
        params: query,
        replace: true,
        enableSearch: false,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, unabledParam]);

  useEffect(() => {
    if (query.sort) {
      const isCheck = checkSort(query.sort);
      dispatch({
        type: "UPDATE",
        payload: isCheck,
      });
    } else {
      dispatch({
        type: "UPDATE",
        payload: {
          sortField: "",
          isAsc: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {
    query,
    setQuery,
    setFilter,
    onSearchHandler,
    onChangeSort,
    checkSort,
  };
};

export default useQueryString;
