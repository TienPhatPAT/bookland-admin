/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

import { FormControl, Stack, Typography } from "@mui/material";

import DropdownFieldUI from "@/components/form-control/dropdown-field/ui";

import { theme } from "@/theme";

import { useTable, useTableDispatch } from "./state";
import { StyledPagination } from "./style";

const DataPagination = () => {
  const { pageSize, pageIndex, pageTotal, rowTotal } = useTable();
  const dispatch = useTableDispatch();

  const itemStartNumber = useMemo(() => {
    return Math.min((pageIndex - 1) * pageSize + 1, rowTotal);
  }, [pageIndex, pageSize, rowTotal]);
  const itemEndNumber = useMemo(() => {
    return Math.min(itemStartNumber + pageSize - 1, rowTotal);
  }, [itemStartNumber, pageSize, rowTotal]);

  const currentPageIndex = useMemo(() => {
    return Math.min(pageIndex, pageTotal);
  }, [pageIndex, pageTotal]);

  const optionList = useMemo(() => {
    return [
      {
        label: "25  per page",
        value: 25,
      },
      {
        label: "50  per page",
        value: 50,
      },
      {
        label: "75  per page",
        value: 75,
      },
      {
        label: "100  per page",
        value: 100,
      },
    ];
  }, []);
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        background: theme.palette.backgrounds.primary,
        height: "52px",
        padding: "0 16px",
        borderTop: "1px solid",
        borderColor: theme.palette.neutralLight[400],
      }}
    >
      <Typography
        variant="Reg_14"
        color={theme.palette.neutralDark[600]}
        sx={{
          marginRight: "auto",
        }}
      >
        showing {itemStartNumber} to {itemEndNumber} of {rowTotal} entries.
      </Typography>
      <FormControl sx={{ minWidth: 132, marginRight: "1px" }}>
        <DropdownFieldUI
          withoutSearch
          multiple={false}
          value={pageSize?.toString()}
          variant="outlined"
          sx={{ height: "36px" }}
          optionList={optionList}
          bindLabel="label"
          onChange={(value) => {
            dispatch({
              type: "UPDATE",
              payload: {
                pageSize: +value,
              },
            });
          }}
        ></DropdownFieldUI>
      </FormControl>
      <StyledPagination
        onChange={(_: any, page: number) => {
          dispatch({
            type: "UPDATE",
            payload: {
              pageIndex: +page,
            },
          });
        }}
        page={currentPageIndex}
        count={pageTotal}
        variant="outlined"
        shape="rounded"
        className="MuiPaginationItem-root"
      />
    </Stack>
  );
};

export default DataPagination;
