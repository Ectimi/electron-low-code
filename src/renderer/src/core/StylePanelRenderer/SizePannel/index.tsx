import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField as MTextField,
  TextFieldProps,
  styled,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useReactive, useSafeState } from 'ahooks';
import { forwardRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TCssValue, TSize } from 'root/renderer/src/materials/types/style';

const UnitInputSelect = styled(Select)({
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  marginLeft: 0,
  borderRadius: 0,
  fieldset: {
    border: 'none',
  },
});

const TextField = styled(MTextField)({
  '.MuiInputBase-input': {
    paddingRight: '70px',
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
    const [unit, setUnit] = useSafeState('px');

    return (
      <Box sx={{ position: 'relative', ...sx }}>
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

const overflowTypes = ['visible', 'hidden', 'scroll', 'auto', 'inherit'];
const objectFitTypes = ['contain', 'cover', 'fill', 'none', 'scale-down'];
const inputTypes = ['width', 'height', 'minWidth', 'minHeight'];

export function SizePannel(props: TSize & { onChange: (data: TSize) => void }) {
  const { onChange, ...restProps } = props;
  const unitState = useReactive({
    width: 'px',
    height: 'px',
    minWidth: 'px',
    minHeight: 'px',
  });
  const { watch, register, control, getValues } = useForm<TSize>({
    defaultValues: restProps,
  });
  const update = (data: TSize) => {
    onChange({
      ...data,
      width: (data.width + unitState.width) as TCssValue,
      height: (data.height + unitState.height) as TCssValue,
      minWidth: (data.minWidth + unitState.minWidth) as TCssValue,
      minHeight: (data.minHeight + unitState.minHeight) as TCssValue,
    } as TSize);
  };

  const onUnitChange = (name: string, unit: string) => {
    (unitState as any)[name] = unit;
    update(getValues());
  };

  useEffect(() => {
    const subscription = watch((data) => {
      update(data as TSize);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Stack gap={2}>
      {inputTypes.map((name) => (
        <InputWithUnit
          key={name}
          {...register(name as keyof TSize)}
          label={name}
          size="small"
          onUnitChange={onUnitChange}
        />
      ))}

      <FormControl fullWidth>
        <InputLabel id="label-overflow">overflow</InputLabel>
        <Controller
          name="overflow"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-overflow"
              size="small"
              label="overflow"
            >
              {overflowTypes.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="label-objectFit">object-fit</InputLabel>
        <Controller
          name="objectFit"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-objectFit"
              size="small"
              label="object-fit"
            >
              {objectFitTypes.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Stack>
  );
}
