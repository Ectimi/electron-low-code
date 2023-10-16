import {
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useReactive } from 'ahooks';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputWithUnit from 'root/renderer/src/components/InputWithUnit';
import { TCssValue, TSize } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';

const overflowTypes = ['visible', 'hidden', 'scroll', 'auto', 'inherit'];
const objectFitTypes = ['contain', 'cover', 'fill', 'none', 'scale-down'];
const inputTypes = ['width', 'height', 'minWidth', 'minHeight'];
let subscription: Subscription | null = null;

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
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = watch((data) => {
      update(data as TSize);
    });
    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

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
