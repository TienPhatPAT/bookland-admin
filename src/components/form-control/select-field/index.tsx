/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo, useEffect, useState } from "react";
import { StateManagerProps } from "node_modules/react-select/dist/declarations/src/useStateManager";
import { Control, FieldError, useController } from "react-hook-form";
import ReactSelect, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  InputActionMeta,
  MultiValueRemoveProps,
  StylesConfig,
} from "react-select";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Stack,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

import useDebounce from "@/hooks/common/useDebounce";

import { ArrowDownIcon, CloseIcon } from "@/assets/icons";

interface METADATA {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
const typedMemo: <T>(
  c: T,
  areEqual?: (
    prevProps: Readonly<React.PropsWithChildren<T>>,
    nextProps: Readonly<React.PropsWithChildren<T>>
  ) => boolean
) => T = memo;
const customStyles = <Option, IsMulti extends boolean = boolean>(
  theme: Theme,
  isError?: boolean,
  styles?: StylesConfig<Option, IsMulti>
): StylesConfig<Option, IsMulti> => ({
  // indicatorSeparator: () => ({
  //     display: 'none',
  // }),
  // indicatorsContainer: (provided) => ({
  //     ...provided,
  //     ' > .pir_react_select__dropdown-indicator': {
  //         padding: '6px 16px 6px 6px',
  //     },
  // }),
  // clearIndicator: (provided) => ({
  //     ...provided,
  //     padding: '6px 0px 6px',
  // }),
  // loadingIndicator: (provided) => ({
  //     ...provided,
  //     padding: '6px 0px 6px !important',
  //     color: '#333',
  // }),
  // option: (provided, state) => ({
  //     ...provided,
  //     padding: '13px 16px 14px',
  //     color: theme.palette.black[50],
  //     fontWeight: '400',
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  //     cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  //     ...(state.isFocused || state.isSelected
  //         ? {
  //             color: `${theme.palette.black[50]} !important`,
  //             background: theme.palette.yellow[500],
  //         }
  //         : {}),
  //     ':active': {
  //         color: theme.palette.black[50],
  //         background: theme.palette.yellow[200],
  //     },
  // }),
  // placeholder: (provided) => ({
  //     ...provided,
  //     fontSize: '14px',
  //     fontWeight: 300,
  //     fontStyle: 'normal',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  //     color: theme.palette.neutralLight[100],
  //     whiteSpace: 'nowrap',
  //     overflow: 'hidden',
  //     textOverflow: 'ellipsis',
  // }),
  // valueContainer: (provided) => ({
  //     ...provided,
  //     paddingLeft: '14px',
  // }),
  // singleValue: (provided) => ({
  //     ...provided,
  //     color: theme.palette.black[50],
  //     fontWeight: '400',
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  // }),
  // multiValue: (provided) => ({
  //     ...provided,
  //     borderRadius: '8px',
  //     background: theme.palette.common.white,
  //     border: `1px solid ${theme.palette.neutralLight[100]}`,
  // }),
  // multiValueLabel: (provided) => ({
  //     ...provided,
  //     color: theme.palette.black[50],
  //     fontWeight: '500',
  //     fontSize: '12px',
  //     letterSpacing: '0.217px',
  // }),
  // multiValueRemove: (provided) => ({
  //     ...provided,
  //     color: 'red',
  //     border: `none`,
  //     ':hover': {
  //         borderRadius: '8px',
  //         background: theme.palette.common.white,
  //     },
  // }),
  // input: (provided) => ({
  //     ...provided,
  //     color: theme.palette.black[50],
  //     fontWeight: '400',
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  //     color: '#333'
  // }),
  control: (provided, state) => ({
    ...provided,
    minHeight: "48px",
    ":hover": {
      ...((!isError &&
        !state.isDisabled && {
          padding: "0px",
          borderWidth: "1px",
          borderColor: theme.palette.primary.light,
        }) ||
        (isError &&
          !state.isDisabled && {
            borderColor: theme.palette.red[500],
          }) || {
          borderColor: theme.palette.neutralLight[900],
        }),
    },

    ...(!isError && !state.isDisabled && state.isFocused
      ? {
          padding: "0px",
          borderWidth: "0px",
          borderColor: theme.palette.primary.light,
        }
      : {}),
    ...(state.isDisabled
      ? {
          background: theme.palette.backgrounds.light1,
        }
      : {}),
    ...(isError
      ? {
          borderWidth: "1px",
          borderColor: theme.palette.red[500],
        }
      : {}),
  }),
  // control: (provided, state) => ({
  //     ...provided,
  //     minHeight: '50px',
  //     borderRadius: '5px',
  //     borderColor: theme.palette.neutralLight[800],
  //     boxShadow: 'unset',
  //     padding: '1px',
  //     ':hover': {
  //         ...((!isError &&
  //             !state.isDisabled && {
  //             padding: '0px',
  //             borderWidth: '2px',
  //             borderColor: theme.palette.yellow[200],
  //         }) ||
  //             (isError &&
  //                 !state.isDisabled && {
  //                 borderColor: theme.palette.red[100],
  //             }) || {
  //             borderColor: theme.palette.neutralLight[900],
  //         }),
  //     },

  //     ...(!isError && !state.isDisabled && state.isFocused
  //         ? {
  //             padding: '0px',
  //             borderWidth: '2px',
  //             borderColor: theme.palette.yellow[200],
  //         }
  //         : {}),
  //     ...(state.isDisabled
  //         ? {
  //             background: theme.palette.backgrounds.light1,
  //         }
  //         : {}),
  //     ...(isError
  //         ? {
  //             borderWidth: '1px',
  //             borderColor: theme.palette.red[100],
  //         }
  //         : {}),
  // }),
  // noOptionsMessage: (provided) => ({
  //     ...provided,
  //     fontWeight: 400,
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  //     color: theme.palette.neutralLight[100],
  // }),
  // loadingMessage: (provided) => ({
  //     ...provided,
  //     fontWeight: 400,
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //     letterSpacing: '0.216667px',
  //     color: theme.palette.neutralLight[800],
  // }),
  // menuPortal: (provided) => ({
  //     ...provided,
  //     zIndex: 999999,
  // }),
  // menu: (provided) => ({
  //     ...provided,
  //     borderRadius: '5px',
  //     boxShadow:
  //         '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
  // }),
  ...styles,
});

const DropdownIndicator = <Option, IsMulti extends boolean = boolean>(
  props: DropdownIndicatorProps<Option, IsMulti>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon
        sx={{
          color: "neutralLight[200]",
          transform: props.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
          fontSize: "24px",
        }}
      />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = <Option, IsMulti extends boolean = boolean>(
  props: ClearIndicatorProps<Option, IsMulti>
) => {
  return (
    <>
      {!props.selectProps.inputValue && (
        <components.ClearIndicator {...props}>
          <CloseIcon sx={{ color: "#333", fontSize: "16px" }} />
        </components.ClearIndicator>
      )}
    </>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon sx={{ fontSize: "16px", color: "#333" }} />
    </components.MultiValueRemove>
  );
};

export interface SelectFieldCustomComponentsData {
  keyword?: string;
}

export interface SelectFieldProps<Option, IsMulti extends boolean = boolean>
  extends StateManagerProps<Option, IsMulti> {
  label?: string;
  sx?: SxProps;
  fullWidth?: boolean;
  name?: string;
  control?: Control<any>;
  hideHelper?: boolean;
  errorMess?: string;
  rootProps?: FormControlProps;
  TooltipLabel?: any;
  getErrorMess?: (error: FieldError, value: string) => string;
  bindKey?: string;
  bindLabel?: string;
  isHasMore?: boolean;
  filterFunc?: boolean;
  loadOptionInit?: boolean;
  refreshWhenOpen?: boolean;
  required?: boolean;
  getOptions?: (pageIndex?: number, pageSize?: number, keyword?: string) => Promise<GetOptionsRes>;
  customComponents?: (
    data: SelectFieldCustomComponentsData
  ) => StateManagerProps<Option, IsMulti>["components"];
}

export interface GetOptionsRes {
  options?: any;
  metadata?: METADATA;
}

export const SelectField = typedMemo(
  <Option, IsMulti extends boolean = boolean>({
    label,
    name = "",
    fullWidth = true,
    rootProps = {},
    value: externalValue,
    onChange: externalOnChange,
    control,
    hideHelper,
    errorMess,
    TooltipLabel,
    getErrorMess,
    bindKey = "value",
    refreshWhenOpen,
    bindLabel = "label",
    isHasMore,
    filterFunc = true,
    getOptions,
    loadOptionInit,
    styles,
    required,
    customComponents,
    ...rest
  }: SelectFieldProps<Option, IsMulti>) => {
    const {
      field: { onChange, onBlur, value },
      fieldState: { error },
    } = control
      ? useController({ name, control })
      : {
          field: {
            onChange: externalOnChange as (...event: any[]) => void,
            value: externalValue,
            onBlur: undefined,
          },
          fieldState: { error: undefined },
        };
    const theme = useTheme();

    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>();
    const [options, setOptions] = useState<any[]>([]);
    const [metadata, setMetadata] = useState<METADATA>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onMenuScrollToBottom = useDebounce(async () => {
      if (
        isLoading ||
        !isHasMore ||
        !getOptions ||
        !metadata ||
        metadata.pageIndex >= metadata.totalPages ||
        !options?.length
      )
        return;
      setIsLoading(true);
      const newPage = metadata.pageIndex + 1;
      const data: GetOptionsRes = await getOptions(newPage, metadata.pageSize, keyword);
      setOptions((pre) => pre.concat(data?.options || []));
      setMetadata(data.metadata);
      setIsLoading(false);
    }, 200);

    const onInputChange = useDebounce(async (newValue: string, actionMeta: InputActionMeta) => {
      if (!isHasMore || !getOptions || (!keyword && !newValue)) return;
      const isClose = actionMeta.action === "menu-close";
      setKeyword(newValue);
      if (!isClose) setIsLoading(true);
      await getOptions(1, metadata?.pageSize, newValue)
        .then((data) => {
          setMetadata(data?.metadata);
          setOptions(data?.options);
        })
        .finally(() => {
          if (!isClose) setIsLoading(false);
        });
    }, 200);

    const onMenuOpen = async () => {
      if (!isHasMore || isLoading || (options?.length && !refreshWhenOpen) || !getOptions) return;
      setIsLoading(true);
      const data = await getOptions(1, metadata?.pageSize);
      setMetadata(data?.metadata);
      setOptions(data?.options);
      setIsLoading(false);
      setKeyword("");
    };

    useEffect(() => {
      const getOptionsInit = async () => {
        if (!isHasMore || !getOptions) return;
        setIsLoading(true);
        const data: GetOptionsRes = await getOptions(1, metadata?.pageSize);
        setMetadata(data.metadata);
        setOptions(data?.options);
        setIsLoading(false);
      };
      if (loadOptionInit) {
        getOptionsInit();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <FormControl variant="outlined" fullWidth={fullWidth} {...rootProps}>
        {label && (
          <Stack flexDirection="row" alignItems="center">
            <FormLabel focused={isFocus} htmlFor={name} required={required}>
              {label}
            </FormLabel>
            {TooltipLabel && <TooltipLabel value={value} />}
          </Stack>
        )}
        <ReactSelect
          value={value ?? null}
          menuPosition="fixed"
          classNamePrefix="nur_react_select"
          instanceId="nur_select"
          styles={customStyles<Option, IsMulti>(theme, !!error, styles)}
          getOptionValue={(option: any) => option[bindKey]}
          getOptionLabel={(option: any) => option[bindLabel]}
          components={{
            DropdownIndicator,
            ClearIndicator,
            MultiValueRemove,
            ...(customComponents?.({ keyword }) || {}),
          }}
          isLoading={isLoading}
          options={options}
          filterOption={
            filterFunc
              ? (option: any, input) => {
                  return (option.data[bindLabel] || "")
                    .toLocaleLowerCase()
                    .includes((input || "").toLocaleLowerCase());
                }
              : () => true
          }
          onMenuOpen={onMenuOpen}
          onInputChange={onInputChange}
          onMenuScrollToBottom={onMenuScrollToBottom}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            onBlur?.();
            setIsFocus(false);
          }}
          onChange={(...t) => {
            if (control) (externalOnChange as any)?.(...t);
            onChange?.(...t);
          }}
          {...rest}
        />
        {!hideHelper && (error || errorMess) && (
          <FormHelperText error={!!error || !!errorMess}>
            {getErrorMess && error ? getErrorMess(error, value) : error?.message || errorMess}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default SelectField;
