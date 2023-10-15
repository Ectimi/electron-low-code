import {
  Box,
  TextField as MTextField,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import type { TextFieldProps, SelectChangeEvent } from "@mui/material";
import { useSafeState } from "ahooks";
import { forwardRef } from "react";

const UnitInputSelect = styled(Select)({
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  marginLeft: 0,
  borderRadius: 0,
  fieldset: {
    border: "none",
  },
});

const TextField = styled(MTextField)({
  ".MuiInputBase-input": {
    paddingRight: "70px",
  },
});
const InputWithUnit = forwardRef(
  (
    props: TextFieldProps & {
      onUnitChange: (name: string, unit: string) => void;
    },
    ref: any
  ) => {
    const { sx, onUnitChange, ...restProps } = props;
    const [unit, setUnit] = useSafeState("px");

    return (
      <Box sx={{ position: "relative", ...sx }}>
        <TextField ref={ref} size="small" type="number" {...restProps} />
        <UnitInputSelect
          value={unit}
          size="small"
          onChange={(e: SelectChangeEvent<any>) => {
            setUnit(e.target.value);
            onUnitChange(restProps.label as string, e.target.value);
          }}
        >
          <MenuItem value="px">px</MenuItem>
          <MenuItem value="%">%</MenuItem>
        </UnitInputSelect>
      </Box>
    );
  }
);

export default InputWithUnit;
