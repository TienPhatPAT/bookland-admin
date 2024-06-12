import { ERROR_MESSAGE, PASSWORD_REGEX } from "@/constants";
import * as yup from "yup";

import { ELogin } from "@/models/auth";

export const yupLogin = yup.object().shape({
  [ELogin.username]: yup.string().trim().required(ERROR_MESSAGE.IEM1),
  [ELogin.password]: yup
    .string()
    .required(ERROR_MESSAGE.IEM1)
    .min(6, ERROR_MESSAGE.IEM4)
    .max(20, ERROR_MESSAGE.IEM4)
    .matches(PASSWORD_REGEX, ERROR_MESSAGE.IEM4),
});
