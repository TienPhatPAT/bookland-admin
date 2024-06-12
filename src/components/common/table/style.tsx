import { Pagination, Select, Table, TableBody, TableHead } from "@mui/material";
import { styled } from "@mui/system";

import { theme } from "@/theme";

export const StyledTable = styled(Table)`
  table-layout: fixed;
  th,
  td {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  th {
    /* Apply both top and bottom borders to the <th> */
    /* border-top: 1px solid; */
    border-bottom: 1px solid;
    border-right: 1px solid;
  }

  td {
    /* For cells, apply the border to one of each side only (right but not left, bottom but not top) */
    border-bottom: 1px solid;
    border-right: 1px solid;
    height: 49px;
    padding: 7px 12px;
  }

  th:first-of-type,
  td:first-of-type {
    /* Apply a left border on the first <td> or <th> in a row */
    /* border-left: 1px solid ${theme.palette.neutralLight[400]}; */
  }
  th:last-child,
  td:last-child {
    /* Apply a left border on the first <td> or <th> in a row */
    border-right: none;
  }
  td,
  th {
    border-color: ${theme.palette.neutralLight[400]};
  }

  th.active {
    border-bottom: 3px solid ${theme.palette.secondary.main};
  }
  th.sortable {
    cursor: pointer;
    :hover {
      background: ${theme.palette.neutralLight[200]};
    }
  }
`;

export const StyledTableHead = styled(TableHead)`
  th,
  td {
    background-color: ${theme.palette.neutralLight[100]};
    border-bottom: 3px solid ${theme.palette.neutralLight[400]};
  }
  th.active,
  td.active {
    border-bottom: 3px solid ${theme.palette.secondary.main};
  }
  th.sticky {
    position: sticky;
    right: 0;
    z-index: 11;
    border-left: 1px solid ${theme.palette.neutralLight[400]};
  }
`;

export const StyledTableBody = styled(TableBody)`
  td {
    border: 1px solid ${theme.palette.neutralLight[300]};
    border-right: none;
    border-top: none;
    &:first-of-type {
      border-left: none;
    }
  }
  tr:nth-of-type(odd),
  tr:nth-of-type(odd) td.sticky {
    background-color: ${theme.palette.neutralLight.main};
  }

  tr:nth-of-type(even),
  tr:nth-of-type(even) td.sticky {
    background-color: ${theme.palette.neutralLight[200]};
  }

  td.sticky {
    position: sticky;
    right: 0;
    z-index: 10 !important;
    background-color: ${theme.palette.neutralLight.main};
    border-left: 2px solid ${theme.palette.neutralLight[500]};
  }
`;

export const StyledSelect = styled(Select)`
  height: "36px";
  padding: "12px";
  font-size: "12px";
`;

export const StyledPagination = styled(Pagination)`
  margin-left: 6px;
  & .MuiPaginationItem-root {
    margin: 0;
    border-radius: 0;
    height: 36px;
    border: 1px solid #b3b9c4;
    padding: 0;
  }
  & li:first-of-type button {
    border-radius: 5px 0 0 5px;
  }
  & li:last-child button {
    border-radius: 0px 5px 5px 0;
  }
`;
