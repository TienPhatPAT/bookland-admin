import { Search } from "@mui/icons-material";

import { StyledInputSearch } from "./styles";

interface Props {
  defaultValue?: string;
  onChange?: (_value: string) => void;
}
function InputSearchUI({ onChange, ...rest }: Props) {
  return (
    <StyledInputSearch
      onChange={onChange}
      placeholder="Search"
      endAdornment={<Search />}
      {...rest}
    />
  );
}

export default InputSearchUI;
