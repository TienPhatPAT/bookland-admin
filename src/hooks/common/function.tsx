import { CategoryType } from "@/models/category";
import { ApiResponse } from "@/models/common";

import { ListStatusStaticContent } from "@/modules/dashboard/static-content/constant";
import { CategoryApi } from "@/services/books.api";

export const getCategories = async (
  pageIndex: number = 1,
  pageSize: number = 25,
  search?: string
) => {
  const params: { page: number; limit: number; search?: string } = {
    page: pageIndex,
    limit: pageSize,
  };
  if (search) params.search = search;

  return CategoryApi.getList({
    ...params,
  })
    .then((data: ApiResponse<CategoryType>) => {
      return {
        options: data.data.map((e: CategoryType) => ({
          value: e.id,
          label: e.name,
        })),
        metadata: {
          pageIndex: data?.metadata?.page,
          pageSize: data?.metadata?.limit,
          totalCount: data?.metadata?.totalCount,
          totalPages: data?.metadata?.totalPages,
        },
      };
    })
    .catch(() => {
      return {
        options: [],
        metadata: {
          pageIndex: 1,
          pageSize: 1,
          totalCount: 1,
          totalPages: 1,
        },
      };
    });
};

enum ListStaticContent {
  Term = "Term",
  Payment_plan = "Payment Policy",
  Privacy_security = "Privacy & Security",
}

// eslint-disable-next-line react-refresh/only-export-components
const ListStaticContentArray = [
  { label: "Term", value: ListStaticContent.Term },
  { label: "Payment Policy", value: ListStaticContent.Payment_plan },
  { label: "Privacy & Security", value: ListStaticContent.Privacy_security },
];
export const getCategoriesStaticContent = async (pageIndex: number = 1, pageSize: number = 25) => {
  return Promise.resolve({
    options: ListStaticContentArray,
    metadata: {
      pageIndex,
      pageSize,
      totalCount: ListStaticContentArray.length,
      totalPages: pageIndex,
    },
  });
};

// eslint-disable-next-line react-refresh/only-export-components
const ListStatusArray = [
  { label: "Show", value: ListStatusStaticContent.SHOW },
  { label: "Hide", value: ListStatusStaticContent.HIDE },
];

export const getListStatus = async (pageIndex: number = 1, pageSize: number = 25) => {
  return Promise.resolve({
    options: ListStatusArray,
    metadata: {
      pageIndex,
      pageSize,
      totalCount: ListStatusArray.length,
      totalPages: pageIndex,
    },
  });
};

enum ListTime {
  monthly = "monthly",
  annual = "annual",
  weekly = "weekly",
}

// eslint-disable-next-line react-refresh/only-export-components
const ListTimeArray = [
  { label: "monthly", value: ListTime.monthly },
  { label: "annual", value: ListTime.annual },
  { label: "weekly", value: ListTime.weekly },
];

export const getListTime = async (pageIndex: number = 1, pageSize: number = 25) => {
  return Promise.resolve({
    options: ListTimeArray,
    metadata: {
      pageIndex,
      pageSize,
      totalCount: ListTimeArray.length,
      totalPages: pageIndex,
    },
  });
};

export const getListActive = async (pageIndex: number = 1, pageSize: number = 25) => {
  return Promise.resolve({
    options: [
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" },
    ],
    metadata: {
      pageIndex,
      pageSize,
      totalCount: 2,
      totalPages: pageIndex,
    },
  });
};
