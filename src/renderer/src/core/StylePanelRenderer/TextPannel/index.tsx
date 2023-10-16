import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TText } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';

const inputTypes = ['fontSize', 'fontFamily', 'lineHeight'];
const fontWeightMap: Record<number, string> = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Normal',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
  800: 'Extra Bold',
  900: 'Heavy',
};
const textAlignMap: Record<TText['textAlign'], string> = {
  left: '左对齐',
  center: '居中对齐',
  right: '右对齐',
  justify: '两端对齐',
  inherit: '继承',
};
const fontStyleMap: Record<TText['fontStyle'], string> = {
  normal: '常规',
  italic: '斜体',
  inherit: '继承',
};
const textDecorationMap: Record<TText['textDecoration'], string> = {
  none: '无',
  underline: '下划线',
  overline: '上划线',
  'line-through': '删除线',
  inherit: '继承',
};
let subscription: Subscription | null = null;
export function TextPannel(
  props: TText & {
    onChange: (type: string, value: string | number) => void;
  }
) {
  const { onChange, ...restProps } = props;
  const { watch, register, control } = useForm<TText>({
    defaultValues: restProps,
  });

  useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = watch((data, { name }) => {
      if (name) {
        onChange(name, data[name]!);
      }
    });
    return () => {
      subscription!.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

  return (
    <Stack gap={2}>
      {inputTypes.map((type) => (
        <FormControl fullWidth key={type}>
          <Controller
            name={type as keyof TText}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={type === 'fontFamily' ? 'text' : 'number'}
                multiline={type === 'fontFamily'}
                size="small"
                label={type}
              />
            )}
          />
        </FormControl>
      ))}

      <FormControl fullWidth>
        <InputLabel id="label-fontWeight">font-weight</InputLabel>
        <Controller
          name="fontWeight"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-fontWeight"
              size="small"
              label="font-weight"
            >
              {Object.entries(fontWeightMap).map(([type, des]) => (
                <MenuItem value={type} key={type}>
                  {type} - {des}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="label-textAlign">text-align</InputLabel>
        <Controller
          name="textAlign"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-textAlign"
              size="small"
              label="text-align"
            >
              {Object.entries(textAlignMap).map(([type, des]) => (
                <MenuItem value={type} key={type}>
                  {type} - {des}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="label-fontStyle">font-style</InputLabel>
        <Controller
          name="fontStyle"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-fontStyle"
              size="small"
              label="font-style"
            >
              {Object.entries(fontStyleMap).map(([type, des]) => (
                <MenuItem value={type} key={type}>
                  {type} - {des}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="label-textDecoration">text-decoration</InputLabel>
        <Controller
          name="textDecoration"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="label-textDecoration"
              size="small"
              label="text-decoration"
            >
              {Object.entries(textDecorationMap).map(([type, des]) => (
                <MenuItem value={type} key={type}>
                  {type} - {des}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Stack direction="row" alignItems="center">
        <div>字体颜色：</div>
        <input {...register('color')} type="color" />
      </Stack>
    </Stack>
  );
}
