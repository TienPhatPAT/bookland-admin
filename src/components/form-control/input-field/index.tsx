import { Control, FieldValues, Path, useController } from "react-hook-form";

import InputFieldUI, { InputFieldUIProps } from "./ui";

type InputFieldProps<T extends FieldValues> = InputFieldUIProps & {
  name: Path<T>;
  control: Control<T>;
};

const InputField = <T extends FieldValues>({ name, control, ...rest }: InputFieldProps<T>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <InputFieldUI
      // id={name}

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

export default InputField;
