import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  StackProps,
  styled,
} from '@mui/material';
import {
  useLatest,
  useReactive,
  useSafeState,
  useUpdateEffect,
} from 'ahooks';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputWithUnit from 'root/renderer/src/components/InputWithUnit';
import { TBackground } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';

type TBackgroundSize = 'auto' | 'cover' | 'contain' | 'custom';
type TFormValue = TBackground & {
  backgroundSizeWidth: number;
  backgroundSizeHeight: number;
};
type TProps = TBackground & { onChange: (data: TBackground) => void };

const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))({});

const backgroundSizes = ['auto', 'cover', 'contain', 'custom'];
const backgroundRepeatTypes = [
  'repeat-x',
  'repeat-y',
  'repeat',
  'space',
  'round',
  'no-repeat',
];

const extractValue = (val: string) => {
  if (val.endsWith('px') || val.endsWith('%')) {
    return { value: parseFloat(val), unit: val.replace(/-?\d+(\.\d+)?/g, '') };
  }
  return { value: parseFloat(val), unit: 'px' };
};

let subscription: Subscription | null = null;

export function BackgroundPannel(props: TProps) {
  const { onChange, ...restProps } = props;
  const [sizeType, setSizeType] = useSafeState<TBackgroundSize>(() => {
    const { backgroundSize } = props;
    return Array.isArray(backgroundSize) ? 'custom' : backgroundSize;
  });
  const lastestSizeType = useLatest(sizeType);
  const unitState = useReactive({ width: 'px', height: 'px' });
  const { watch, register, control, getValues } = useForm<TFormValue>({
    defaultValues: (function getDefaultValue() {
      const { backgroundSize } = props;

      let backgroundSizeWidth = 0;
      let backgroundSizeHeight = 0;
      if (Array.isArray(backgroundSize)) {
        const { value: width, unit: wUnit } = extractValue(
          backgroundSize[0] as string
        );
        const { value: height, unit: hUnit } = extractValue(
          backgroundSize[1] as string
        );

        backgroundSizeWidth = width;
        backgroundSizeHeight = height;
        unitState.width = wUnit;
        unitState.height = hUnit;
      }

      return {
        ...restProps,
        backgroundSizeWidth,
        backgroundSizeHeight,
      };
    })(),
  });

  const update = (data: TFormValue) => {
    const backgroundSize =
      lastestSizeType.current === 'custom'
        ? [
            data.backgroundSizeWidth + unitState.width,
            data.backgroundSizeHeight + unitState.height,
          ]
        : lastestSizeType.current;

    onChange({
      backgroundColor: data.backgroundColor,
      backgroundImage: data.backgroundImage,
      backgroundSize,
      backgroundRepeat: data.backgroundRepeat,
      backgroundPositionX: data.backgroundPositionX,
      backgroundPositionY: data.backgroundPositionY,
      backgroundClip: data.backgroundClip,
    } as TBackground);
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
      update(data as TFormValue);
    });
    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

  useUpdateEffect(() => {
    update(getValues());
  }, [sizeType]);

  return (
    <Stack gap={2}>
      <StackFlex>
        <div>颜色</div>
        <input {...register('backgroundColor')} type="color" />
      </StackFlex>
      <StackFlex>
        <div>尺寸</div>
        <Stack gap={2} sx={{ width: '209px' }}>
          <Stack gap={2}>
            <FormControl fullWidth>
              <InputLabel id="label-size">size</InputLabel>
              <Select
                labelId="label-size"
                size="small"
                label="size"
                value={sizeType}
                onChange={(e) => {
                  setSizeType(e.target.value as TBackgroundSize);
                }}
              >
                {backgroundSizes.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {sizeType === 'custom' && (
              <>
                <InputWithUnit
                  {...register('backgroundSizeWidth')}
                  size="small"
                  label="width"
                  type="number"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitState.width}
                />
                <InputWithUnit
                  {...register('backgroundSizeHeight')}
                  size="small"
                  label="height"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitState.height}
                />
              </>
            )}
          </Stack>
        </Stack>
      </StackFlex>
      <StackFlex>
        <div>重复</div>
        <FormControl sx={{ width: '209px' }}>
          <InputLabel id="label-repeat">repeat</InputLabel>
          <Controller
            name="backgroundRepeat"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="label-repeat"
                size="small"
                label="repeat"
              >
                {backgroundRepeatTypes.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </StackFlex>
    </Stack>
  );
}
