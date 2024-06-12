import { FilterOption, FilterOptionType } from "@/models/common";

import { theme } from "@/theme";

enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const colorStatus: {
  [key: string]: string;
} = {
  [STATUS.ACTIVE]: theme.palette.primary.light,
  [STATUS.INACTIVE]: theme.palette.neutralLight[500],
};

export const filterOptions: FilterOption[] = [
  {
    name: "Name",
    key: "f_name",
    type: FilterOptionType.TEXT,
    placeholder: "Enter name",
  },
];
