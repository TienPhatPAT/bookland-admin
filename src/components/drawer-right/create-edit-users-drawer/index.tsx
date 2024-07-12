import { useEffect } from "react";
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from "@/constants";
import { subscribe, unsubscribe } from "@/utils/event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Stack } from "@mui/material";

import { EAction } from "@/constants/event";

import { PhoneNumber } from "@/models/common";
import { PostUserRequest, UserType } from "@/models/user";
import { useUser } from "@/hooks/users";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import CheckBoxField from "@/components/form-control/check-box-field";
import DateField from "@/components/form-control/date-field";
import DropdownField from "@/components/form-control/dropdown-field";
import ImageField from "@/components/form-control/image-field/index ";
import InputField from "@/components/form-control/input-field";
import PhoneNumberField from "@/components/form-control/phone-number";

import { theme } from "@/theme";

import useDrawerRight from "../use-drawer";

interface Props {
  dataItem?: UserType;
}

const formSchema = yup.object().shape({
  ten: yup.string().required(ERROR_MESSAGE.IEM1),
  password: yup.string().required(ERROR_MESSAGE.IEM1),
  email: yup.string().required(ERROR_MESSAGE.IEM1),
  gioitinh: yup.number().required(ERROR_MESSAGE.IEM1),
  avt: yup.string().optional(),
  sdt: yup.mixed<PhoneNumber>().required(ERROR_MESSAGE.IEM1),
  ngaytao: yup.string().required(ERROR_MESSAGE.IEM1),
  loaitaikhoan: yup.number().required(ERROR_MESSAGE.IEM1),
  is_active: yup.boolean().required(ERROR_MESSAGE.IEM1),
});

const CreateUserDrawer = ({ dataItem }: Props) => {
  const { create, update } = useUser();
  const { hide } = useDrawerRight();
  const dialog = useDialogConfirm();

  useEffect(() => {
    subscribe(EAction.MAIN, onSubmit);

    return () => {
      unsubscribe(EAction.MAIN, onSubmit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    defaultValues: {
      ten: "",
      password: "",
      email: "",
      gioitinh: 1,
      avt: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      sdt: { phoneNumber: "", countryCode: "+84" },
      ngaytao: "",
      loaitaikhoan: 0,
      is_active: true,
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { control, reset } = form;

  useEffect(() => {
    if (dataItem) {
      reset({
        ten: dataItem.ten,
        password: dataItem.password,
        email: dataItem.email,
        gioitinh: dataItem.gioitinh,
        avt: dataItem.avt,
        sdt: {
          phoneNumber: dataItem.sdt,
          countryCode: "+84",
        },
        ngaytao: dataItem.ngaytao,
        loaitaikhoan: dataItem.loaitaikhoan,
        is_active: dataItem.is_active,
      });
    }
  }, [dataItem, reset]);

  const onSubmit = form.handleSubmit(() => {
    const rawValue = form.getValues();
    const request: PostUserRequest = {
      ten: rawValue.ten,
      password: rawValue.password,
      email: rawValue.email,
      gioitinh: rawValue.gioitinh,
      avt: rawValue.avt,
      sdt: `${rawValue.sdt.countryCode} ${rawValue.sdt.phoneNumber}`,
      ngaytao: rawValue.ngaytao,
      loaitaikhoan: rawValue.loaitaikhoan,
      is_active: rawValue.is_active,
    };
    dialog.show({
      title: "Confirm action",
      description: CONFIRM_MESSAGE.CM2,
      color: theme.palette.primary.main,
      yesText: "Submit",
      callbackYes: () => {
        if (dataItem) {
          request.id_user = dataItem._id;
          update.mutate(request, {
            onSuccess() {
              reset();
              hide();
            },
          });
        } else {
          create.mutate(request, {
            onSuccess() {
              reset();
              hide();
            },
          });
        }
      },
    });
  });

  return (
    <Stack gap={2}>
      <ImageField label="Avatar" name="avt" control={control} required />
      <InputField name="ten" label="Ten" placeholder="Ten" control={control} required />
      <InputField name="email" label="Email" placeholder="Email" control={control} required />
      <PhoneNumberField name="sdt" label="Sdt" control={control} required />
      <DropdownField
        name="gioitinh"
        label="Gioi tinh"
        control={control}
        optionList={[
          {
            label: "Nam",
            value: 1,
          },
          {
            label: "Nu",
            value: 0,
          },
        ]}
      />
      <DateField
        name="ngaytao"
        control={control}
        label="Ngay Tao"
        fullWidth
        placeholder="DD MMM yyyy"
      />
      <DropdownField
        name="loaitaikhoan"
        label="Loai tai khoan"
        control={control}
        optionList={[
          {
            label: "Admin",
            value: 1,
          },
          {
            label: "User",
            value: 0,
          },
        ]}
      />
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        control={control}
      />
      <CheckBoxField name="is_active" label="Active" control={control} />
    </Stack>
  );
};

export default CreateUserDrawer;
