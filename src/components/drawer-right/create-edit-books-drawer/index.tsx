import { useEffect } from "react";
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from "@/constants";
import { subscribe, unsubscribe } from "@/utils/event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Stack } from "@mui/material";

import { EAction } from "@/constants/event";

import { BookType, PostBookRequest } from "@/models/book";
import { ApiResponse, OptionItem } from "@/models/common";
import { TacGiaType } from "@/models/tacgia";
import { useAddCategory, useEditCategory } from "@/hooks/category";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import CheckBoxField from "@/components/form-control/check-box-field";
import DateField from "@/components/form-control/date-field";
import ImageField from "@/components/form-control/image-field/index ";
import InputField from "@/components/form-control/input-field";
import SelectField from "@/components/form-control/select-field";

import { TacGiaApi } from "@/services/tac-gia.api";

import { theme } from "@/theme";

import useDrawerRight from "../use-drawer";

interface Props {
  dataItem?: BookType;
}

const formSchema = yup.object().shape({
  id_tacgia: yup
    .mixed<OptionItem>()
    .nullable()
    .typeError(ERROR_MESSAGE.IEM1)
    .required(ERROR_MESSAGE.IEM1),
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
      id_tacgia: undefined,
      nxb: "",
      img: "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/48502.jpg?v=1&w=480&h=700",
      description: "",
      ngayxuatban: "",
      ngaytao: "",
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
        id_tacgia: {
          value: dataItem.tacgia,
          label: dataItem.tacgia,
        },
        nxb: dataItem.nxb,
        img: dataItem.img,
        description: dataItem.description,
        ngayxuatban: dataItem.ngayxuatban,
        ngaytao: dataItem.ngaytao,
        isRecommended: dataItem.isRecommended,
        ten: dataItem.name,
        view: dataItem.view,
        price: dataItem.price,
        recomendedPriority: dataItem.recomendedPriority || 0,
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
      name: rawValue.ten,
      id_tacgia: rawValue.id_tacgia.id,
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

  const getTacgia = async (pageIndex: number = 1, pageSize: number = 25, search?: string) => {
    const params: { page: number; limit: number; search?: string; f_status?: string } = {
      page: pageIndex,
      limit: pageSize,
      f_status: "active",
    };
    if (search) params.search = search;

    return TacGiaApi.getList({
      ...params,
    })
      .then((data: ApiResponse<TacGiaType>) => {
        return {
          options: data.data.map((e: TacGiaType) => ({
            value: e._id,
            label: e.ten,
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

  return (
    <Stack gap={2}>
      <ImageField label="Bia Sach" name="img" control={control} required />
      <InputField name="ten" label="Ten Sach" placeholder="Ten" control={control} required />
      <SelectField<OptionItem>
        label="Tac Gia"
        name="id_tacgia"
        placeholder="Select"
        control={control}
        isHasMore
        getOptions={getTacgia}
        loadOptionInit={true}
        isClearable
        required
      />
      <InputField name="nxb" label="NXB" placeholder="nxb" control={control} required />
      <DateField
        name="ngayxuatban"
        control={control}
        label="Ngay Xuat Ban"
        fullWidth
        placeholder="DD MMM yyyy"
      />
      <InputField
        name="price"
        label="Price"
        placeholder="Price"
        control={control}
        type="number"
        required
      />
      <InputField
        name="description"
        label="Description"
        placeholder="Description"
        control={control}
        multiline
        rows={8}
      />
      <CheckBoxField name="isRecommended" label="Recommended" control={control} />
    </Stack>
  );
};

export default CreateBookDrawer;
