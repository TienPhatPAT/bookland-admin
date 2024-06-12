/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useController } from "react-hook-form";

import { Checkbox, CheckboxPropsColorOverrides, FormControlLabel, FormGroup } from "@mui/material";

interface CheckboxProps extends CheckboxPropsColorOverrides {
  name: string;
  control: Control<any>;
  label?: string;
  isDefaultChecked?: boolean;
}

const CheckBoxField = ({ name, control, label, ...rest }: CheckboxProps) => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
  });

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox ref={ref} checked={value} onChange={onChange} />}
        label={label}
        {...rest}
      />
    </FormGroup>
  );
};

export default CheckBoxField;
