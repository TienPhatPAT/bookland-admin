import { Control, FieldValues, Path, useController } from "react-hook-form";
import { AnyObject } from "yup";

import DropdownFieldUI, { DropdownFieldUIProps } from "./ui";

type DropdownFieldProps<P, T extends FieldValues> = DropdownFieldUIProps<P> & {
  name: Path<T>;
  control: Control<T>;
};
const DropdownField = <P extends AnyObject, T extends FieldValues>({
  name,
  control,
  ...rest
}: DropdownFieldProps<P, T>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <DropdownFieldUI<P>
      id={name}
      onChange={onChange}
      inputRef={ref}
      onBlur={onBlur}
      value={value}
      error={!!error}
      helper={error?.message}
      {...rest}
    />
  );
};
export default DropdownField;
