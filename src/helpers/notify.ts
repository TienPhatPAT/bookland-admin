import { TOAST } from "@/constants";
import { toast } from "react-toastify";

export class NotifyService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static error(e: any) {
    const data = getDataError(e);
    let message = data?.error || data?.message || e;
    if (data?.data?.errors?.[0]) message = data.data.errors[0];
    toast.error(message, TOAST.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static success(r: any) {
    toast.success(r?.data?.data?.success || r?.data?.message || r, TOAST.success);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static warning(r: any) {
    toast.warning(r?.data?.data?.failed || r?.data?.message || r, TOAST.success);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const getDataError = <T extends any = any>(e: any) => {
  return (e?.response?.data || e) as T;
};
