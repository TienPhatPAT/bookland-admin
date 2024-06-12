/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CommonParams {
  page?: number;
  limit?: number;
  offset?: number;
  search?: string;
  sort?: string;
}
export interface ApiResponse<T> {
  message: string;
  data: T[];
  metadata: Metadata;
}

export interface ApiResponseDetail<T> {
  title: string | undefined;
  type: string | undefined;
  author: string | undefined;
  category: string | undefined;
  status: string | undefined;
  message: string;
  data: {
    data: T;
  };
}

export interface Metadata {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
}

export interface PhoneNumber {
  countryCode: string;
  phoneNumber: string;
}
export interface OptionItem<T = string> {
  id: T;
  value?: T;
  label?: string;
  [key: string]: any;
}

export type ValueType =
  | OptionItem<any>[]
  | OptionItem<any>
  | string
  | number
  | boolean
  | null
  | undefined;

export interface FilterValue {
  [key: string]: ValueType;
}

export enum FilterOptionType {
  TEXT = "TEXT",
  SINGLE_SELECT = "SINGLE_SELECT",
  DATE_PICKER = "DATE_PICKER",
  SINGLE_CHECKBOX = "SINGLE_CHECKBOX",
}

export interface FilterCurrentValueItem extends FilterOption {
  value: ValueType;
}

export interface FilterCurrentValue {
  [key: string]: FilterCurrentValueItem;
}

export interface FilterOption {
  name: string;
  key: string;
  type: FilterOptionType;
  placeholder?: string;
}
