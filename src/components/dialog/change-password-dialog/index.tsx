import { CONFIRM_MESSAGE, ERROR_MESSAGE, PASSWORD_REGEX } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button, Stack, Typography } from "@mui/material";

import { IChangePassword } from "@/models/admin";
import { useProfile } from "@/hooks/profile";
import useChangePassword from "@/hooks/profile/useChangePassword";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import InputField from "@/components/form-control/input-field";

import { theme } from "@/theme";

import usePopup from "../use-popup";

const schema = yup
  .object({
    oldPassword: yup.string().required(ERROR_MESSAGE.IEM1),
    newPassword: yup
      .string()
      .min(8)
      .max(32)
      .matches(PASSWORD_REGEX, ERROR_MESSAGE.IEM4)
      .required(ERROR_MESSAGE.IEM1),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], ERROR_MESSAGE.IEM5)
      .required(ERROR_MESSAGE.IEM1),
  })
  .required();

export default function ChangePasswordDialog() {
  const { hide } = usePopup();
  const { data } = useProfile();
  const dataProfile = data?.data.data;
  const dialog = useDialogConfirm();
  const { mutate: changePassword } = useChangePassword();

  const { handleSubmit, control, reset } = useForm<IChangePassword>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: IChangePassword) => {
    if (dataProfile) {
      dialog.show({
        title: "Confirm action",
        description: CONFIRM_MESSAGE.CM2,
        color: theme.palette.primary.main,
        yesText: "Submit",
        callbackYes: () => {
          changePassword(data, {
            onSuccess: () => {
              reset();
              hide();
            },
          });
        },
      });
    }
  };

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <Stack pb={1} spacing="10px" textAlign="center">
          <Typography variant="Bold_16">Change Password</Typography>
          <Typography variant="Light_14">Setup your password to get started</Typography>
        </Stack>
        <InputField
          name="oldPassword"
          control={control}
          label="Current Password"
          type="password"
          placeholder="Password"
        />
        <InputField
          name="newPassword"
          control={control}
          label="New Password"
          type="password"
          placeholder="Password"
        />
        <InputField
          name="confirmNewPassword"
          control={control}
          label="Confirm New Password"
          type="password"
          placeholder="Password"
        />
        <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Button type="submit" variant="contained" sx={{ width: "147px" }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
