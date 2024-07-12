import { useEffect, useMemo, useState } from "react";
import { CONFIRM_MESSAGE, DELAY_SEARCH_TIME } from "@/constants";

import { Avatar, Breadcrumbs, Button, IconButton, Link, Stack, Tooltip } from "@mui/material";

import { GetBookParams } from "@/models/book";
import { FilterValue, Metadata } from "@/models/common";
import { IQueryString } from "@/models/query";
import { UserType } from "@/models/user";
import { formatDate } from "@/helpers/date";
import useDebounce from "@/hooks/common/useDebounce";
import { useUser } from "@/hooks/users";
import { Datatable, FilterMenu, GlobalLoader, InputSearchUI } from "@/components/common";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import CreateUserDrawer from "@/components/drawer-right/create-edit-users-drawer";
import useDrawerRight from "@/components/drawer-right/use-drawer";
import Mainlayout from "@/components/layout/main-layout";

import { theme } from "@/theme";
import { DeleteIcon, EditIcon } from "@/assets/icons";

import { filterOptions } from "./constant";

const Users = () => {
  const [queryParams, setQueryParams] = useState<GetBookParams>({
    page: 1,
    limit: 25,
  });

  const { useGetList, del } = useUser();

  const { data, isFetched } = useGetList(queryParams);

  // Fix reload page when data undefined
  const [dataBook, setDataBook] = useState<UserType[]>([]);
  const [metaData, setDataMetadata] = useState<Metadata>({
    page: 1,
    limit: 25,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
  });

  useEffect(() => {
    if (data) {
      setDataBook(data?.data);
      setDataMetadata({ ...metaData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const drawer = useDrawerRight();
  const dialog = useDialogConfirm();

  const onCreate = () => {
    drawer.show({
      title: "Create Book",
      body: <CreateUserDrawer />,
      buttonText: "Create",
    });
  };

  const onEdit = (data: UserType) => {
    drawer.show({
      title: "Update User",
      body: <CreateUserDrawer dataItem={data} />,
      buttonText: "Update",
    });
  };

  const onDelete = (id: string) => {
    dialog.show({
      title: "Delete User ?",
      description: CONFIRM_MESSAGE.CM1,
      color: theme.palette.red[500],
      callbackYes: () => {
        del.mutate(id);
      },
    });
  };

  const handleSearch = useDebounce((keyword: string) => {
    const _params = { ...queryParams, page: 1 };
    if (keyword) _params.search = keyword;
    else delete _params.search;
    return setQueryParams(_params);
  }, DELAY_SEARCH_TIME);

  const filterValue: FilterValue = useMemo(() => {
    return {
      f_name: queryParams.f_name,
    };
  }, [queryParams]);

  const onChangeFilter = (value: FilterValue | Partial<IQueryString>) => {
    const _params = { ...queryParams };
    delete _params.f_name;
    setQueryParams({
      ..._params,
      ...value,
      page: 1,
    });
  };

  return (
    <>
      <Mainlayout>
        <Mainlayout.Header>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: "41px",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit">
                Users
              </Link>
            </Breadcrumbs>

            <Stack direction="row" spacing={1}>
              <InputSearchUI onChange={(keyword) => handleSearch(keyword)} />
              <FilterMenu
                filterOptions={filterOptions}
                filterValue={filterValue}
                onChange={onChangeFilter}
                //TODO
                //  fetchDataOption={fetchDataOption}
              />
            </Stack>

            <Stack flexDirection="row" gap={1}>
              <Button variant="contained" onClick={onCreate}>
                Create
              </Button>
            </Stack>
          </Stack>
        </Mainlayout.Header>
        <Mainlayout.Body>
          <>
            {!isFetched && <GlobalLoader isLoading={!isFetched} />}
            <Datatable
              pageSize={metaData.limit}
              pageIndex={metaData.page}
              pageTotal={metaData.totalPages}
              rowTotal={metaData.totalCount}
              data={dataBook}
              onSortChange={(e) => {
                const { sort_by, sort_direction } = e;
                setQueryParams({
                  ...queryParams,
                  sort: sort_direction === "asc" ? sort_by : `-${sort_by}`,
                });
              }}
              onPageChange={(e) => {
                const { pageIndex, pageSize } = e;
                setQueryParams({ ...queryParams, page: pageIndex, limit: pageSize });
              }}
            >
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sortable={true}
                  name="_id"
                  text="ID"
                  sx={{ width: "200px" }}
                ></Datatable.HeadCell>
                <Datatable.BodyCell field="_id"></Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sx={{ width: "100px" }}
                  sortable={true}
                  name="avt"
                  text="Avatar"
                ></Datatable.HeadCell>
                <Datatable.BodyCell>
                  {(data: UserType) => (
                    <Avatar
                      sx={{ width: "30px", height: "30px" }}
                      src={data?.avt}
                      alt={data?.avt}
                    />
                  )}
                </Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sortable={true}
                  name="ten"
                  text="Tên Sách"
                  sx={{ width: "200px" }}
                ></Datatable.HeadCell>
                <Datatable.BodyCell field="ten"></Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sortable={true}
                  name="email"
                  text="Email"
                  sx={{ width: "200px" }}
                ></Datatable.HeadCell>
                <Datatable.BodyCell field="email"></Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sortable={true}
                  name="loaitaikhoan"
                  text="Loại"
                  sx={{ width: "200px" }}
                ></Datatable.HeadCell>
                <Datatable.BodyCell>
                  {(data: UserType) => <>{data.loaitaikhoan === 1 ? "Admin" : "User"}</>}
                </Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sortable={true}
                  name="ngayxuatban"
                  text="Ngày Tao"
                  sx={{ width: "200px" }}
                ></Datatable.HeadCell>
                <Datatable.BodyCell>
                  {(data: UserType) => <>{formatDate(data?.ngaytao)}</>}
                </Datatable.BodyCell>
              </Datatable.ColTemplate>
              <Datatable.ColTemplate>
                <Datatable.HeadCell
                  sticky
                  sx={{ width: "140px" }}
                  name="action"
                  text="Action"
                ></Datatable.HeadCell>
                <Datatable.BodyCell>
                  {(data: UserType) => (
                    <Stack flexDirection="row" alignItems="center" gap={0.5}>
                      <Tooltip title="Update" placement="top">
                        <span>
                          <IconButton
                            onClick={() => {
                              onEdit(data);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <span>
                          <IconButton onClick={() => onDelete(data._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                  )}
                </Datatable.BodyCell>
              </Datatable.ColTemplate>
            </Datatable>
          </>
        </Mainlayout.Body>
      </Mainlayout>
    </>
  );
};

export default Users;
