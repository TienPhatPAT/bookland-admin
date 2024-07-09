import { Control, FieldValues, Path, useController } from "react-hook-form";
import DateFieldUI, { DateFieldUIProps } from "./ui";

type DateFieldProps<T extends FieldValues> = DateFieldUIProps & {
  name: Path<T>;
  control: Control<T>;
};

const DateField = <T extends FieldValues>({
  name,
  control,
  ...rest
}: DateFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <DateFieldUI
      onChange={onChange}
      value={value}
      error={!!error}
      helper={error?.message}
      {...rest}
    />
  );
};

export default DateField;
