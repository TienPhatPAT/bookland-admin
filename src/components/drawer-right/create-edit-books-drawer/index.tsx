import { useEffect } from "react";
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from "@/constants";
import { subscribe, unsubscribe } from "@/utils/event";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Stack } from "@mui/material";

import { EAction } from "@/constants/event";

import { BookType, PostBookRequest } from "@/models/book";
import { useAddCategory, useCategoryById, useEditCategory } from "@/hooks/category";
import useDialogConfirm from "@/components/confirm-dialog/use-dialog-confirm";
import DropdownField from "@/components/form-control/dropdown-field";
import ImageField from "@/components/form-control/image-field/index ";
import InputField from "@/components/form-control/input-field";

import { theme } from "@/theme";

import useDrawerRight from "../use-drawer";

interface Props {
  isEdit?: boolean;
  idItem?: string;
}

const formSchema = yup.object().shape({
  title: yup.string().required(ERROR_MESSAGE.IEM1),
  name: yup.string().required(ERROR_MESSAGE.IEM1),
  image: yup.string().required(ERROR_MESSAGE.IEM1),
  status: yup.string().required(ERROR_MESSAGE.IEM1),
});

const CreateBookDrawer = ({ isEdit = false, idItem }: Props) => {
  const { data } = useCategoryById(idItem);
  const CategoryDetail: BookType | undefined = data?.data.data;
  const { mutate: addCategory } = useAddCategory();
  const { mutate: editCategory } = useEditCategory();
  const { hide } = useDrawerRight();
  const dialog = useDialogConfirm();

  const statusList = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    subscribe(EAction.MAIN, onSubmit);

    return () => {
      unsubscribe(EAction.MAIN, onSubmit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    defaultValues: {
      title: "",
      name: "",
      image: "",
      status: "active",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { control, reset } = form;

  useEffect(() => {
    if (isEdit && CategoryDetail) {
      reset({
        title: CategoryDetail.title,
        name: CategoryDetail.name,
        image: CategoryDetail.image,
        status: CategoryDetail.status,
      });
    }
  }, [CategoryDetail, isEdit, reset]);

  const onSubmit = form.handleSubmit(() => {
    const rawValue = form.getValues();
    const request: PostBookRequest = {
      title: rawValue.title,
      name: rawValue.name,
      image: rawValue.image,
      status: rawValue.status,
    };
    dialog.show({
      title: "Confirm action",
      description: CONFIRM_MESSAGE.CM2,
      color: theme.palette.primary.main,
      yesText: "Submit",
      callbackYes: () => {
        if (isEdit && idItem) {
          request.id = idItem;
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
      <InputField name="title" label="Title" placeholder="Title" control={control} />
      <InputField name="name" label="Name" placeholder="Name" control={control} />
      <DropdownField
        withoutSearch
        variant="outlined"
        optionList={statusList}
        name="status"
        control={control}
        label="Status"
        placeholder="Status"
      />
      <ImageField name="image" control={control} label="Image" />
    </Stack>
  );
};

export default CreateBookDrawer;
