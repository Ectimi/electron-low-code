import { useRef } from 'react';
import {
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useReactive, useUpdateEffect } from 'ahooks';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputWithUnit from 'root/renderer/src/components/InputWithUnit';
import { TCssValue, TSize } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';

type TProps = TSize & { onChange: (data: TSize) => void };

const overflowTypes = ['visible', 'hidden', 'scroll', 'auto', 'inherit'];
const objectFitTypes = ['contain', 'cover', 'fill', 'none', 'scale-down'];
const inputTypes = ['width', 'height', 'minWidth', 'minHeight'];

let subscription: Subscription | null = null;

const unitParser = (val: string | number) => {
  if (isNaN(Number(val))) {
    if (val.toString().includes('px')) {
      return 'px';
    } else {
      return '%';
    }
  }
  return 'px';
};

export function SizePannel(props: TProps) {
  const { onChange, ...restProps } = props;
  const shouldUpdate = useRef(true);
  const unitState = useReactive({
    width: unitParser(restProps.width),
    height: unitParser(restProps.height),
    minWidth: unitParser(restProps.minWidth),
    minHeight: unitParser(restProps.minHeight),
  });
  const { watch, register, control, getValues, setValue } = useForm<TSize>({
    defaultValues: {
      ...restProps,
      width: parseFloat(restProps.width as any),
      height: parseFloat(restProps.height as any),
      minWidth: parseFloat(restProps.minWidth as any),
      minHeight: parseFloat(restProps.minHeight as any),
    },
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

  const onUnitChange = (unit: string, name: string) => {
    (unitState as any)[name] = unit;
    update(getValues());
  };

  useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = watch((data) => {
      shouldUpdate.current && update(data as TSize);
    });
    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

  useUpdateEffect(() => {
    const { width, height, minWidth, minHeight, objectFit, overflow } = props;

    unitState.width = unitParser(width);
    unitState.height = unitParser(height);
    unitState.minWidth = unitParser(minWidth);
    unitState.minHeight = unitParser(minHeight);

    const shouldUpdateWidth = parseFloat(width as any) !== getValues('width');
    const shouldUpdateHeight =
      parseFloat(height as any) !== getValues('height');
    const shouldUpdateMinWidth =
      parseFloat(minWidth as any) !== getValues('minWidth');
    const shouldUpdateMinHeight =
      parseFloat(minHeight as any) !== getValues('minHeight');
    const shouldUpdateObjectFit = objectFit !== getValues('objectFit');
    const shouldUpdateOverflow = overflow !== getValues('overflow');

    shouldUpdate.current = !(
      shouldUpdateWidth ||
      shouldUpdateHeight ||
      shouldUpdateMinWidth ||
      shouldUpdateMinHeight ||
      shouldUpdateObjectFit ||
      shouldUpdateOverflow
    );

    if (shouldUpdate.current === false) {
      shouldUpdateWidth && setValue('width', parseFloat(width as any));
      shouldUpdateHeight && setValue('height', parseFloat(height as any));
      shouldUpdateMinWidth && setValue('minWidth', parseFloat(minWidth as any));
      shouldUpdateMinHeight &&
        setValue('minHeight', parseFloat(minHeight as any));
      shouldUpdateObjectFit && setValue('objectFit', objectFit);
      shouldUpdateOverflow && setValue('overflow', overflow);

      shouldUpdate.current = true;
    }
  }, [props]);

  return (
    <Stack gap={2}>
      {inputTypes.map((name) => (
        <InputWithUnit
          key={name}
          {...register(name as keyof TSize)}
          label={name}
          size="small"
          onUnitChange={onUnitChange}
          defaultUnit={(unitState as any)[name]}
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
