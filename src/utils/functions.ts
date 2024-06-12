import { CONSTANTS, ERROR_MESSAGE, ISizeUnit } from "@/constants";
import { toast } from "react-toastify";

export const mapSelectOptions = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  bindKey: string = "id",
  bindLabel: string = "name",
  includeDefault: boolean = true,
  isOptionDisabled: string | null = null
) => {
  const defaultOption = {
    value: "",
    label: "All",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = data.map((item: any) => ({
    value: item[bindKey].toString() || item.toString(),
    label: item[bindLabel] || item,
    disabled:
      isOptionDisabled !== null &&
      isOptionDisabled !== item[bindKey].toString() &&
      isOptionDisabled !== item[bindKey],
  }));
  return includeDefault ? [defaultOption, ...options] : options;
};

export const convertSize = (num: number, unit: ISizeUnit) => {
  switch (unit) {
    case "TB":
      return num * Math.pow(1024, 4);
    case "GB":
      return num * Math.pow(1024, 3);
    case "MB":
      return num * Math.pow(1024, 2);
    case "KB":
      return num * 1024;
    case "B":
      return num;
  }
};

export const validateImage = (listFile: File[]) => {
  const fileGreaterThan3MB = listFile.some((file) => file.size > convertSize(3, "MB"));
  const wrongTypeFile = listFile.some((file) => !CONSTANTS.ALLOW_IMG_TYPE.includes(file.type));
  if (wrongTypeFile) {
    toast.error(ERROR_MESSAGE.field.imageType);
    return false;
  } else if (fileGreaterThan3MB) {
    toast.error(ERROR_MESSAGE.field.fileSize(3, "MB"));
    return false;
  }

  return true;
};
