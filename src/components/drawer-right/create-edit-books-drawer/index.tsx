import { useEffect } from "react";
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from "@/constants";
import { subscribe, unsubscribe } from "@/utils/event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Stack } from "@mui/material";

import { EAction } from "@/constants/event";

import { BookType, PostBookRequest } from "@/models/book";
import { useAddCategory, useEditCategory } from "@/hooks/category";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import CheckBoxField from "@/components/form-control/check-box-field";
import ImageField from "@/components/form-control/image-field/index ";
import InputField from "@/components/form-control/input-field";

import { theme } from "@/theme";

import useDrawerRight from "../use-drawer";

interface Props {
  dataItem?: BookType;
}

const formSchema = yup.object().shape({
  id_tacgia: yup.string().required(ERROR_MESSAGE.IEM1),
  nxb: yup.string().optional(),
  img: yup.string().required(ERROR_MESSAGE.IEM1),
  description: yup.string().optional(),
  ngayxuatban: yup.string().optional(),
  ngaytao: yup.string().optional(),
  isRecommended: yup.boolean().required(ERROR_MESSAGE.IEM1),
  ten: yup.string().required(ERROR_MESSAGE.IEM1),
  view: yup.number().required(ERROR_MESSAGE.IEM1),
  price: yup.number().required(ERROR_MESSAGE.IEM1),
  recomendedPriority: yup.number().required(ERROR_MESSAGE.IEM1),
  star: yup.number().required(ERROR_MESSAGE.IEM1),
  sold: yup.number().required(ERROR_MESSAGE.IEM1),
  language: yup.string().optional(),
  hien_thi: yup.boolean().required(ERROR_MESSAGE.IEM1),
});

const CreateBookDrawer = ({ dataItem }: Props) => {
  const { mutate: addCategory } = useAddCategory();
  const { mutate: editCategory } = useEditCategory();
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
      id_tacgia: "66839c1206eac338985bd5e7",
      nxb: "",
      img: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/48502.jpg?v=1&w=480&h=700",
      description: "",
      ngayxuatban: "2024-05-29T00:00:00.000Z",
      ngaytao: "2024-05-29T00:00:00.000Z",
      isRecommended: false,
      ten: "",
      view: 123,
      price: 0,
      recomendedPriority: 0,
      star: 5,
      sold: 4455,
      language: "",
      hien_thi: true,
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { control, reset } = form;

  useEffect(() => {
    if (dataItem) {
      reset({
        id_tacgia: dataItem.tacgia,
        nxb: dataItem.nxb,
        img: dataItem.img,
        description: dataItem.description,
        ngayxuatban: dataItem.ngayxuatban,
        ngaytao: dataItem.ngaytao,
        isRecommended: dataItem.isRecommended,
        ten: dataItem.ten,
        view: dataItem.view,
        price: dataItem.price,
        recomendedPriority: dataItem.recomendedPriority,
        star: dataItem.star,
        sold: dataItem.sold,
        language: "",
        hien_thi: dataItem.hien_thi,
      });
    }
  }, [dataItem, reset]);

  const onSubmit = form.handleSubmit(() => {
    const rawValue = form.getValues();
    const request: PostBookRequest = {
      ten: rawValue.ten,
      id_tacgia: rawValue.id_tacgia,
      nxb: rawValue.nxb,
      img: rawValue.img,
      description: rawValue.description,
      ngayxuatban: rawValue.ngayxuatban,
      ngaytao: rawValue.ngaytao,
      isRecommended: rawValue.isRecommended,
      view: rawValue.view,
      price: rawValue.price,
      recomendedPriority: rawValue.recomendedPriority,
      star: rawValue.star,
      sold: rawValue.sold,
      language: rawValue.language,
      hien_thi: rawValue.hien_thi,
    };
    dialog.show({
      title: "Confirm action",
      description: CONFIRM_MESSAGE.CM2,
      color: theme.palette.primary.main,
      yesText: "Submit",
      callbackYes: () => {
        if (dataItem) {
          request.id = dataItem._id;
          editCategory(request, {
            onSuccess() {
              reset();
              hide();
            },
          });
        } else {
          addCategory(request, {
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
      <ImageField name="img" control={control} />
      <InputField name="ten" label="Ten Sach" placeholder="Ten" control={control} />
      <InputField name="nxb" label="NXB" placeholder="nxb" control={control} />
      <InputField name="price" label="Price" placeholder="Price" control={control} type="number" />
      <CheckBoxField name="isRecommended" label="Recommended" control={control} />
    </Stack>
  );
};

export default CreateBookDrawer;
