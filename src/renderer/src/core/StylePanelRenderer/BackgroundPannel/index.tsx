import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  StackProps,
  styled,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { TBackground } from 'root/renderer/src/materials/types/style';

const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))();

const backgroundSizes = ['auto', 'cover', 'contain', 'custom'];

export function BackgroundPannel(
  props: TBackground & { onChange?: (data: TBackground) => void }
) {
  const { onChange, ...restProps } = props;
  const { watch, register, control, getValues } = useForm<TBackground>({
    defaultValues: {...restProps},
  });

  return (
    <Stack gap={2}>
      <StackFlex>
        <div>颜色</div>
        <input {...register('backgroundColor')} type="color" />
      </StackFlex>
      <StackFlex>
        <div>尺寸</div>
        <FormControl>
          <InputLabel>background-size-x</InputLabel>
          <Controller
            name="backgroundSizeX"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="label-backgroundSizeX"
                size="small"
                label="background-size-x"
              >
                {backgroundSizes.map((type) => (
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
