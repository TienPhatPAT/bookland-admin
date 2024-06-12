/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, ReactElement, ReactNode, useEffect } from "react";
import clsx from "clsx";

import { Box, Stack, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { theme } from "@/theme";
import { SortDownIcon } from "@/assets/icons";
import SortDefaultIcon from "@/assets/icons/sort-default-icon";
import SortUpIcon from "@/assets/icons/sort-up-icon";

import DataPagination from "./data-pagination";
import { useTable, useTableDispatch } from "./state";
import { StyledTable, StyledTableBody, StyledTableHead } from "./style";

const HeadCell = (
  props: HeadCellProps = {
    sortable: false,
    name: "",
    sticky: false,
    sx: {},
  }
) => {
  const { sortField, isAsc } = useTable();
  const dispatch = useTableDispatch();
  if (typeof props.children === "function") {
    return <>{props.children(props)}</>;
  }
  const render = props.children || <Typography variant="Reg_14">{props.text}</Typography>;
  let icons = null;

  if (props.sortable) {
    icons = (
      <Box sx={{ color: theme.palette.neutralLight[500] }}>
        <SortDefaultIcon />
      </Box>
    );
  }
  // this column is active sort
  let isActive = false;
  if (sortField === props.name) {
    isActive = true;
    icons = isAsc ? <SortUpIcon /> : <SortDownIcon />;
  }
  const updateSortFiled = (props: HeadCellProps) => {
    if (!props.sortable) return;
    let currentSort = isAsc;
    if (props.name === sortField) {
      currentSort = !currentSort;
    }
    dispatch({
      type: "UPDATE",
      payload: {
        sortField: props.name,
        isAsc: currentSort,
      },
    });
  };

  return (
    <TableCell
      sx={props.sx}
      className={clsx({
        active: isActive,
        sortable: props.sortable,
        sticky: props.sticky,
      })}
      onClick={() => {
        updateSortFiled(props);
      }}
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        {render}
        {icons}
      </Stack>
    </TableCell>
  );
};

const ColTemplate = (props: ColProps) => {
  return <>{props.children}</>;
};

const BodyCell = (props: BodyCellProps) => {
  const { field = "", children, data = {} } = props;
  let render: any = children;
  if (typeof children === "function") {
    render = children(data);
  }
  if (field) {
    render = <Typography variant="Reg_14">{data[field]}</Typography>;
  }

  return (
    <TableCell
      className={clsx({
        sticky: props.sticky,
      })}
    >
      {render}
    </TableCell>
  );
};

interface TableProps {
  pageSize: number;
  pageIndex: number;
  pageTotal: number;
  rowTotal: number;
  data: any[];
  onSortChange?: (data: { sort_by: string; sort_direction: string }) => void;
  onPageChange?: (_metadata: { pageIndex: number; pageSize: number }) => void;
  children: ReactElement | ReactElement[];
  sx?: any;
}

// TODO config only one table for one screen.
const Datatable = (props: TableProps) => {
  return <DatatableContent {...props}></DatatableContent>;
};

const DatatableContent = (props: TableProps) => {
  const { children, ...rest } = props;
  const { sortField, isAsc, pageSize, pageIndex } = useTable();
  const dispatch = useTableDispatch();

  useEffect(() => {
    dispatch({
      type: "UPDATE",
      payload: {
        pageSize: props.pageSize,
        pageIndex: props.pageIndex,
        pageTotal: props.pageTotal,
        rowTotal: props.rowTotal,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageSize, props.pageIndex, props.pageTotal, props.rowTotal]);

  useEffect(() => {
    if (sortField && rest.onSortChange) {
      rest.onSortChange({
        sort_by: sortField,
        sort_direction: isAsc ? "asc" : "desc",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, isAsc]);

  useEffect(() => {
    if (pageSize && pageIndex && rest.onPageChange) {
      rest.onPageChange({
        pageSize,
        pageIndex,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageIndex]);

  //TODO
  // useEffect(() => {
  //   // reset state after table destroy
  //   return () => {
  //     dispatch({ type: "RESET", payload: {} });
  //   };
  // }, []);

  const colTemplates: {
    head: ReactElement<HeadCellProps, typeof HeadCell>[];
    cell: ReactElement<BodyCellProps, typeof BodyCell>[];
  } = { head: [], cell: [] };
  const colTemp = findAllChild(children, ColTemplate);
  colTemp.forEach((c) => {
    const head = findOneChild(c.props.children, HeadCell);
    const body = findOneChild(c.props.children, BodyCell);
    if (!head || !body) return;
    colTemplates.head.push(head);
    colTemplates.cell.push(body);
  });

  return (
    <Stack
      sx={{
        flex: 1,
        overflow: "auto",
        border: "1px solid",
        borderColor: theme.palette.neutralLight[400],
      }}
    >
      <Stack sx={{ overflowY: "auto", flex: 1 }}>
        <StyledTable stickyHeader aria-label="sticky table" sx={props.sx}>
          <StyledTableHead>
            <TableRow>
              {colTemplates.head.map((HeadElement, colIndex) => (
                <HeadElement.type {...HeadElement.props} key={`head-${colIndex}`}>
                  {HeadElement.props.children}
                </HeadElement.type>
              ))}
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {rest.data?.length ? (
              rest.data.map((prod: any, index) => (
                <TableRow key={`row-${index}`}>
                  {colTemplates.cell.map((CellElement, colIndex) => (
                    <CellElement.type
                      data={prod}
                      {...CellElement.props}
                      key={`cell-${index}-${colIndex}`}
                      {...colTemplates.head[colIndex].props}
                    >
                      {CellElement.props.children}
                    </CellElement.type>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={colTemplates.head.length} sx={{ textAlign: "center" }}>
                  <Typography variant="Reg_14">No Results</Typography>
                </TableCell>
              </TableRow>
            )}
          </StyledTableBody>
        </StyledTable>
      </Stack>
      <DataPagination />
    </Stack>
  );
};

const findAllChild = (children: ReactElement | ReactElement[], type: any) => {
  const result: ReactElement[] = [];
  Children.forEach(children, (child) => {
    if (child.type === type) {
      result.push(child);
    }
  });
  return result;
};

const findOneChild = (children: ReactElement | ReactElement[], type: any) => {
  let result: null = null;
  Children.forEach(children, (child: any) => {
    if (child.type === type) {
      result = child;
      return result;
    }
  });
  return result;
};

export interface ColProps {
  children?: ReactNode | any;
  id?: number;
}

export interface HeadCellProps {
  sortable?: boolean;
  children?: ReactNode | any;
  text?: string;
  name: string;
  className?: string;
  sticky?: boolean;
  sx?: any;
}

export interface BodyCellProps {
  field?: string;
  rowIndex?: number;
  children?: ReactNode | ((_data: any) => React.JSX.Element);
  data?: any;
  sticky?: boolean;
}

Datatable.ColTemplate = ColTemplate;
Datatable.HeadCell = HeadCell;
Datatable.BodyCell = BodyCell;

export default Datatable;
