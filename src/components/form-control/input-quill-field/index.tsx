/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useController } from "react-hook-form";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";

import { StyledReactQuill } from "./styles";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  required?: boolean;
  readonly?: boolean;
}

const InputQuillField = ({ name, control, label, required, readonly }: Props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "font",
    "size",
    "color",
    "align",
    "clean",
    "background",
  ];

  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <StyledReactQuill
        modules={modules}
        formats={formats}
        readOnly={readonly}
        value={value}
        onChange={onChange}
        {...ref}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default InputQuillField;
