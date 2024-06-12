import { memo, useEffect, useMemo, useState } from "react";
import _ from "lodash";

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

import {
  FilterCurrentValue,
  FilterOption,
  FilterOptionType,
  FilterValue,
  ValueType,
} from "@/models/common";
import { IQueryString } from "@/models/query";

import { FilteredIcon, FilterIcon } from "@/assets/icons";

import { StyledFilterButton, StyledFilterMenu, StyledInputText } from "./styles";

interface Props {
  filterOptions: FilterOption[];
  filterValue: FilterValue;
  onChange: (
    param: Partial<IQueryString> | FilterValue,
    clearFilter?: FilterValue | undefined
  ) => void;
  //TODO
  //   fetchDataOption?: (
  //     key: string,
  //     keyword?: string,
  //     limit?: number,
  //     page?: number
  //   ) => Promise<any> | null | undefined;
}

const FilterMenu = memo(({ filterOptions, filterValue, onChange }: Props) => {
  const [currentValue, setCurrentValue] = useState<FilterCurrentValue>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isValidData = (type: FilterOptionType, value: ValueType) => {
    switch (type) {
      case FilterOptionType.TEXT:
        return !!(value as string);
      case FilterOptionType.SINGLE_SELECT:
        return !!value;
      case FilterOptionType.DATE_PICKER:
        return !!value;
      case FilterOptionType.SINGLE_CHECKBOX:
        return !!value;
    }
  };

  const convertData = () => {
    const _currentValue: FilterCurrentValue = {};
    Object.keys(filterValue || {}).forEach((key) => {
      const item = filterOptions?.find((it) => it.key === key);
      if (item && isValidData(item.type, filterValue[key])) {
        _currentValue[key] = {
          ...item,
          value: filterValue[key],
        };
      }
    });
    return _currentValue;
  };

  useEffect(() => {
    const _currentValue = convertData();
    setCurrentValue(_currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, filterOptions]);

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const initOption = (type: FilterOptionType) => {
    switch (type) {
      case FilterOptionType.TEXT:
        return "";
      case FilterOptionType.SINGLE_SELECT:
        return null;
      case FilterOptionType.DATE_PICKER:
        return null;
      case FilterOptionType.SINGLE_CHECKBOX:
        return true;
    }
  };

  const onToggleFilterControl = (item: FilterOption) => {
    const _currentValue = { ...currentValue };
    if (currentValue[item.key]) {
      delete _currentValue[item.key];
    } else {
      _currentValue[item.key] = {
        ...item,
        value: initOption(item.type),
      };
    }
    setCurrentValue(_currentValue);
  };

  const renderOption = (item: FilterOption) => {
    switch (item.type) {
      case FilterOptionType.TEXT:
        return (
          <StyledInputText
            value={currentValue[item.key]?.value ?? ""}
            placeholder={item.placeholder}
            onChange={(e) => {
              const _currentValue = { ...currentValue };
              _currentValue[item.key].value = e.target.value;
              setCurrentValue(_currentValue);
            }}
          />
        );
    }
  };

  const getFilterValue = () => {
    const _filterValue: FilterValue = {};
    Object.keys(currentValue).forEach((key) => {
      if (currentValue[key] && isValidData(currentValue[key].type, currentValue[key].value)) {
        _filterValue[key] = currentValue[key].value;
      }
    });
    return _filterValue;
  };

  const isValidShow = useMemo(() => {
    const data = getFilterValue();
    return Object.keys(data)?.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  const _onChange = () => {
    const data = getFilterValue();
    if (!isValidShow || _.isEqual(data, filterValue)) return;
    onChange(data);
    handleCloseFilter();
  };

  const onClearAll = () => {
    const _currentValue = convertData();
    setCurrentValue({});
    onChange({}, filterValue);
    if (_.isEmpty(_currentValue)) return;

    handleCloseFilter();
  };

  const numberFilter = useMemo(() => {
    return Object.keys(currentValue).length;
  }, [currentValue]);

  return (
    <>
      <StyledFilterButton
        variant="contained"
        startIcon={numberFilter ? <FilteredIcon /> : <FilterIcon />}
        onClick={handleOpenFilter}
      >
        Filter {!!numberFilter && `(${numberFilter})`}
      </StyledFilterButton>
      <StyledFilterMenu
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          if (numberFilter === 0) onClearAll();
          handleCloseFilter();
        }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box className="filter_body">
          <Typography variant="Semibold_16" sx={{ mb: "20px" }}>
            Filter
          </Typography>
          <Box>
            {filterOptions.map((item) => {
              return (
                <Box key={item.key}>
                  <FormControlLabel
                    sx={{
                      [`&.MuiFormControlLabel-root`]: {
                        height: "35px",
                      },
                    }}
                    control={
                      <Checkbox
                        checked={!!currentValue[item.key]}
                        onChange={() => {
                          onToggleFilterControl(item);
                        }}
                      />
                    }
                    label={item.name}
                  />
                  <Collapse in={!!currentValue[item.key]}>{renderOption(item)}</Collapse>
                </Box>
              );
            })}
          </Box>
          <Stack mt={"20px"} direction="row" spacing={1}>
            <Button fullWidth onClick={onClearAll} variant="outlined">
              Clear All
            </Button>
            <Button disabled={!isValidShow} fullWidth onClick={_onChange} variant="contained">
              Show
            </Button>
          </Stack>
        </Box>
      </StyledFilterMenu>
    </>
  );
});

export default FilterMenu;
