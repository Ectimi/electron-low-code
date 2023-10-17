import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  StackProps,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { ReactElement, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TEffect, TStyle } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';

let subscription: Subscription | null = null;

const outlineStyles = [
  'none',
  'dotted',
  'dashed',
  'solid',
  'bouble',
  'groove',
  'ridge',
  'inset',
  'outset',
  'inherit',
];
const cursorStyles = [
  'default',
  'auto',
  'crosshair',
  'pointer',
  'move',
  'e-resize',
  'ne-resize',
  'nw-resize',
  'n-resize',
  'se-resize',
  'sw-resize',
  's-resize',
  'w-resize',
  'text',
  'wait',
  'help',
];
const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))();

type TNestedFieldRender = (args: {
  value: any;
  onChange: (val: any) => void;
}) => ReactElement;

export function EffectPannel(
  props: TStyle['effect'] & { onChange: (data: TEffect) => void }
) {
  const { onChange, opacity, ...restProps } = props;
  const { watch, control } = useForm<TEffect>({
    defaultValues: {
      ...restProps,
      opacity: opacity * 100,
    },
  });

  const NestedField = ({
    name,
    attr,
    render,
  }: {
    name: any;
    attr: string;
    render: TNestedFieldRender;
  }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = field.value[attr];
          const onChange = (event: any) => {
            const updatedValue = { ...field.value, [attr]: event.target.value };
            field.onChange(updatedValue);
          };

          return render({ value, onChange });
        }}
      />
    );
  };

  useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = watch((data) => {
      onChange({
        ...data,
        opacity: data.opacity! / 100,
      } as TEffect);
      console.log(data);
    });
    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

  return (
    <Stack gap={2}>
      <StackFlex>
        <div>光标</div>
        <FormControl sx={{ width: '209px' }}>
          <InputLabel id="label-cursorStyle">cursor-style</InputLabel>
          <Controller
            name="cursor"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="label-cursorStyle"
                size="small"
                label="cursorStyle"
              >
                {cursorStyles.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </StackFlex>

      <Divider />

      <Stack gap={1}>
        <Typography variant="subtitle1">透明度</Typography>
        <Controller
          name="opacity"
          control={control}
          render={({ field }) => (
            <StackFlex>
              <Box sx={{ width: '150px' }}>
                <Slider
                  {...field}
                  min={0}
                  max={100}
                  step={1}
                  size="small"
                  valueLabelDisplay="auto"
                />
              </Box>
              <TextField
                {...field}
                type="number"
                label="opacity"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                sx={{ width: '100px' }}
              />
            </StackFlex>
          )}
        />
      </Stack>

      <Divider />

      <Stack gap={2}>
        <Typography variant="subtitle1">轮廓</Typography>
        <StackFlex>
          <div>宽度</div>
          <NestedField
            name="outline"
            attr="width"
            render={(field) => (
              <TextField
                label="outline-width"
                type="number"
                size="small"
                sx={{ width: '209px' }}
                {...field}
              />
            )}
          />
        </StackFlex>
        <StackFlex>
          <div>颜色</div>
          <NestedField
            name="outline"
            attr="color"
            render={(field) => <input type="color" {...field} />}
          />
        </StackFlex>
        <StackFlex>
          <div>样式</div>
          <FormControl sx={{ width: '209px' }}>
            <InputLabel id="label-outlineStyle">outline-style</InputLabel>
            <NestedField
              name="outline"
              attr="style"
              render={(field) => (
                <Select
                  labelId="label-outlineStyle"
                  size="small"
                  label="outline-style"
                  {...field}
                >
                  {outlineStyles.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </StackFlex>
      </Stack>

      <Divider />

      <Stack gap={2}>
        <Typography variant="subtitle1">阴影</Typography>

        <StackFlex>
          <div>inset</div>
          <FormControl sx={{ width: '209px' }}>
            <InputLabel id="label-boxShadowInset">outline-style</InputLabel>
            <NestedField
              name="boxShadow"
              attr="boxShadowInset"
              render={(field) => (
                <Select
                  labelId="label-boxShadowInset"
                  size="small"
                  label="boxShadowInset"
                  onChange={(e) =>
                    field.onChange({
                      target: {
                        value: Number(e.target.value) === 1 ? true : false,
                      },
                    })
                  }
                  value={field.value ? 1 : 0}
                >
                  <MenuItem value={1}>true</MenuItem>
                  <MenuItem value={0}>false</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </StackFlex>

        <StackFlex>
          <div>偏移</div>
          <StackFlex sx={{ width: '209px' }}>
            <NestedField
              name="boxShadow"
              attr="boxShadowOffsetX"
              render={(field) => (
                <TextField
                  {...field}
                  type="number"
                  label="offset-x"
                  size="small"
                />
              )}
            />
            <NestedField
              name="boxShadow"
              attr="boxShadowOffsetY"
              render={(field) => (
                <TextField
                  {...field}
                  type="number"
                  label="offset-y"
                  size="small"
                />
              )}
            />
          </StackFlex>
        </StackFlex>

        <StackFlex>
          <div>模糊半径</div>
          <NestedField
            name="boxShadow"
            attr="boxShadowBlurRadius"
            render={(field) => (
              <TextField
                {...field}
                type="number"
                size="small"
                sx={{ width: '180px' }}
              />
            )}
          />
        </StackFlex>

        <StackFlex>
          <div>扩散半径</div>
          <NestedField
            name="boxShadow"
            attr="boxShadowSpreadRadius"
            render={(field) => (
              <TextField
                {...field}
                type="number"
                size="small"
                sx={{ width: '180px' }}
              />
            )}
          />
        </StackFlex>

        <StackFlex>
          <div>颜色</div>
          <NestedField
            name="boxShadow"
            attr="boxShadowColor"
            render={(field) => <input type="color" {...field} />}
          />
        </StackFlex>
      </Stack>
    </Stack>
  );
}
