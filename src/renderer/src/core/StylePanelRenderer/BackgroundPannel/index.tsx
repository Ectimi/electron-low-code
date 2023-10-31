import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  StackProps,
  Tooltip,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { useLatest, useSafeState, useUpdateEffect } from 'ahooks';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'root/renderer/src/components/Image';
import InputWithUnit from 'root/renderer/src/components/InputWithUnit';
import { TBackground } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';
import { extractCssValue, isValidCssValue } from 'root/renderer/src/utils';
import modalStore from 'root/renderer/src/store/modal';
import ResourceSelectModal from 'root/renderer/src/components/modal/ResourceSelectModal';

type TBackgroundSize = 'auto' | 'cover' | 'contain' | 'custom';
type TBackgroundPosition = 'left' | 'center' | 'right' | 'custom';
type TFormValue = TBackground & {
  backgroundSizeWidth: number;
  backgroundSizeHeight: number;
};
type TProps = TBackground & { onChange: (data: TBackground) => void };

const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))({});

const ImageAction = styled(StackFlex)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'none',
});

const ImageBox = styled('div')({
  position: 'relative',
  ':hover': {
    '.MuiStack-root': {
      display: 'block',
    },
  },
});

const backgroundSizes = ['auto', 'cover', 'contain', 'custom'];
const backgroundRepeatTypes = [
  'repeat-x',
  'repeat-y',
  'repeat',
  'space',
  'round',
  'no-repeat',
];
const backgroundPositionTypes = ['left', 'center', 'right', 'custom'];
const backgroundClipTypes = [
  'border-box',
  'padding-box',
  'content-box',
  'text',
];

let subscription: Subscription | null = null;

export function BackgroundPannel(props: TProps) {
  const { onChange, ...restProps } = props;
  const [sizeType, setSizeType] = useSafeState<TBackgroundSize>(() => {
    const { backgroundSize } = props;
    return Array.isArray(backgroundSize) ? 'custom' : backgroundSize;
  });
  const [positionXType, setPositionXType] = useSafeState<TBackgroundPosition>(
    () => {
      const { backgroundPositionX } = props;
      return isValidCssValue(backgroundPositionX)
        ? 'custom'
        : (backgroundPositionX as TBackgroundPosition);
    }
  );
  const [positionYType, setPositionYType] = useSafeState<TBackgroundPosition>(
    () => {
      const { backgroundPositionY } = props;
      return isValidCssValue(backgroundPositionY)
        ? 'custom'
        : (backgroundPositionY as TBackgroundPosition);
    }
  );
  const lastestSizeType = useLatest(sizeType);
  const lastestPosXType = useLatest(positionXType);
  const lastestPosYType = useLatest(positionYType);
  const unitRef = useRef({
    width: 'px',
    height: 'px',
    'position-x': 'px',
    'position-y': 'px',
  });
  const { watch, register, control, getValues, setValue } = useForm<TFormValue>(
    {
      defaultValues: (function getDefaultValue() {
        const { backgroundSize } = props;

        let backgroundPositionX = 0;
        let backgroundPositionY = 0;
        let backgroundSizeWidth = 0;
        let backgroundSizeHeight = 0;

        if (Array.isArray(backgroundSize)) {
          const { value: width, unit: wUnit } = extractCssValue(
            backgroundSize[0] as string
          );
          const { value: height, unit: hUnit } = extractCssValue(
            backgroundSize[1] as string
          );

          backgroundSizeWidth = width;
          backgroundSizeHeight = height;
          unitRef.current.width = wUnit;
          unitRef.current.height = hUnit;
        }

        if (isValidCssValue(props.backgroundPositionX)) {
          const { value, unit } = extractCssValue(props.backgroundPositionX);
          backgroundPositionX = value;
          unitRef.current['position-x'] = unit;
        }

        if (isValidCssValue(props.backgroundPositionY)) {
          const { value, unit } = extractCssValue(props.backgroundPositionY);
          backgroundPositionY = value;
          unitRef.current['position-y'] = unit;
        }

        return {
          ...restProps,
          backgroundSizeWidth,
          backgroundSizeHeight,
          backgroundPositionX,
          backgroundPositionY,
        };
      })(),
    }
  );
  const [selectedImage, setSelectedImage] = useSafeState(
    getValues('backgroundImage')
  );

  const update = (data: TFormValue) => {
    const backgroundSize =
      lastestSizeType.current === 'custom'
        ? [
            data.backgroundSizeWidth + unitRef.current.width,
            data.backgroundSizeHeight + unitRef.current.height,
          ]
        : lastestSizeType.current;

    const backgroundPositionX =
      lastestPosXType.current === 'custom'
        ? data.backgroundPositionX + unitRef.current['position-x']
        : lastestPosXType.current;

    const backgroundPositionY =
      lastestPosYType.current === 'custom'
        ? data.backgroundPositionY + unitRef.current['position-y']
        : lastestPosYType.current;

    onChange({
      backgroundSize,
      backgroundPositionX,
      backgroundPositionY,
      backgroundColor: data.backgroundColor,
      backgroundImage: data.backgroundImage,
      backgroundRepeat: data.backgroundRepeat,
      backgroundClip: data.backgroundClip,
    } as TBackground);
  };

  const onUnitChange = (unit: string, name: string) => {
    (unitRef.current as any)[name] = unit;
    update(getValues());
  };

  const openDialog = () => modalStore.toggleResourceSelectModal(true);

  const closeDialog = () => modalStore.toggleResourceSelectModal(false);

  const onSelect = (imagePath: string) => {
    setSelectedImage(imagePath);
    setValue('backgroundImage', imagePath);
    update(getValues());
    closeDialog();
  };

  const handleDelete = () => {
    setSelectedImage('none');
    setValue('backgroundImage', 'none');
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
  }, [sizeType, positionXType, positionYType]);

  return (
    <>
      <Stack gap={2}>
        <StackFlex>
          <div>颜色</div>
          <input {...register('backgroundColor')} type="color" />
        </StackFlex>

        <StackFlex>
          <div>图片</div>
          <Stack direction="row" sx={{ width: '209px' }}>
            <ImageBox>
              <Image
                src={selectedImage}
                title="点击选择图片"
                onClick={openDialog}
              />
              {selectedImage !== 'none' && (
                <ImageAction>
                  <Tooltip title="选择图片" arrow>
                    <IconButton onClick={openDialog}>
                      <ImageIcon sx={{ color: '#fff' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="删除背景图片" arrow>
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon sx={{ color: '#ef5350' }} />
                    </IconButton>
                  </Tooltip>
                </ImageAction>
              )}
            </ImageBox>
          </Stack>
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
                    defaultUnit={unitRef.current.width}
                  />
                  <InputWithUnit
                    {...register('backgroundSizeHeight')}
                    size="small"
                    label="height"
                    onUnitChange={onUnitChange}
                    defaultUnit={unitRef.current.height}
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

        <StackFlex>
          <div>剪裁</div>
          <FormControl sx={{ width: '209px' }}>
            <InputLabel id="label-clip">clip</InputLabel>
            <Controller
              name="backgroundClip"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="label-clip"
                  size="small"
                  label="clip"
                >
                  {backgroundClipTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </StackFlex>

        <StackFlex>
          <div>位置</div>
          <Stack gap={2} sx={{ width: '209px' }}>
            <Stack gap={2}>
              <Divider>x轴</Divider>
              <FormControl fullWidth>
                <InputLabel id="label-position-x">position</InputLabel>
                <Select
                  labelId="label-position-x"
                  size="small"
                  label="position"
                  value={positionXType}
                  onChange={(e) => {
                    setPositionXType(e.target.value as TBackgroundPosition);
                  }}
                >
                  {backgroundPositionTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {positionXType === 'custom' && (
                <InputWithUnit
                  {...register('backgroundPositionX')}
                  size="small"
                  label="position-x"
                  type="number"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitRef.current['position-x']}
                />
              )}
            </Stack>

            <Stack gap={2}>
              <Divider>y轴</Divider>
              <FormControl fullWidth>
                <InputLabel id="label-position-y">position</InputLabel>
                <Select
                  labelId="label-position-y"
                  size="small"
                  label="position"
                  value={positionYType}
                  onChange={(e) => {
                    setPositionYType(e.target.value as TBackgroundPosition);
                  }}
                >
                  {backgroundPositionTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {positionYType === 'custom' && (
                <InputWithUnit
                  {...register('backgroundPositionY')}
                  size="small"
                  label="position-y"
                  type="number"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitRef.current['position-y']}
                />
              )}
            </Stack>
          </Stack>
        </StackFlex>
      </Stack>

      <ResourceSelectModal type="image" onSelect={onSelect} />
    </>
  );
}
