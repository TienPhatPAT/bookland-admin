import { ToastOptions } from "react-toastify";

export const functionKeys = [
  8, // Backspace
  9, // Tab
  13, // Enter
  16, // Shift
  17, // Ctrl
  18, // Alt
  20, // Caps Lock
  27, // Escape
  35, // End
  36, // Home
  37, // Left arrow
  38, // Up arrow
  39, // Right arrow
  40, // Down arrow
  45, // Insert
  46, // Delete
  91, // Left Window key
  92, // Right Window key
  93, // Select key
];

export const DELAY_SEARCH_TIME = 700; // milliseconds

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*()_+{}|:"<>?]{8,32}$/;

/**
 *
 */
export const ERROR_MESSAGE = {
  /**This field is required. */
  IEM1: "This field is required.",
  /**Invalid email format.*/
  IEM2: "Invalid email format.",
  /**Name of the Field  already existed, please use another one. */
  IEM3: "Name of the Field  already existed, please use another one.",
  /**Invalid password format.*/
  IEM4: "Invalid password format.",
  /**Password does not match.*/
  IEM5: "Password does not match.",
  /**Incorrect password, please try again. */
  IEM6: "Incorrect password, please try again.",
  /**Confirm Password does not match. */
  IEM7: "Confirm Password does not match.",
  /**Email does not exist. */
  IEM8: "Email does not exist.",
  /**OTP must be a 6-digit code. */
  IEM9: "OTP must be a 6-digit code.",
  /**OTP code expired, please click resend to use new code. */
  IEM10: "OTP code expired, please click resend to use new code.",
  /**TOTP is incorrect. */
  IEM11: "OTP is incorrect.",
  /**Password already in use. */
  IEM12: "Password already in use. ",
  /**Exceeded max character length of {X} */
  IEM13: (maxLength: number) => `Exceeded max character length of ${maxLength}.`,
  /**Please select countries */
  IEM14: "Please select countries",
  /**TPlease select sectors */
  IEM15: "Please select sectors",

  IEM16: "Duration must be an integer",

  field: {
    fileSize: (fileSize: number, unit: ISizeUnit) =>
      `${"File size exceeds limit. Please select a photo under"} ${fileSize}${unit}.`,
    imageType: "Unsupported format, please use image with formats: *JPG, *JPEG or *PNG",
  },
};

export const SUCCESS_MESSAGE = {
  SM1: "Your account is created successfully!",
};

export const CONFIRM_MESSAGE = {
  CM1: "Are you sure you want to delete this item?",
  CM2: "Do you want to perform this action?",
  CM3: "Are you sure you want to inactive this item?",
};
export const TOAST: { [key: string]: ToastOptions } = {
  error: {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
  success: {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
};

export const INIT_COUNTRY_CODE = { code: "+65", name: "sg" };

export const ERROR_CODE = {
  1001: 1001, // Invalid email or password
  1004: 1004, // Token is invalid
  4001: 4001, // Token has expired
  4002: 4002, // Token incorrect
};

export const CONSTANTS = {
  ALLOW_IMG_TYPE: ["image/png", "image/jpg", "image/jpeg"],
  ALLOW_IMG_EXTENSION: ["jpg", "png", "jpeg"],
  ALLOW_VIDEO_TYPE: ["video/*"],
};
// image size
export type ISizeUnit = "TB" | "GB" | "MB" | "KB" | "B";
