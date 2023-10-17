import {
  Box as MBox,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useReactive, useSafeState } from 'ahooks';
import { TPosition } from 'root/renderer/src/materials/types/style';
import SvgPositionPatterrn from './SvgPositionPattern';
import { Box, PersetContainer, PresetFlexBox, PresetValue } from '../GapPannel';

const PatternWrap = styled('div')({
  gridArea: '1 / 2 / -1 / 3',
  display: 'grid',
  gridTemplateColumns: '36px 1fr 36px',
  gridTemplateRows: '24px minmax(16px,1fr) 24px',
  justifyItems: 'center',
  width: '172px',
  height: '64px',
  marginLeft: '20px',
});

const PositionEdit = styled('div')({
  padding: '2px',
  userSelect: 'none',
  fontSize: '10px',
  color: '#191919',
  placeSelf: 'center',
});
const gridAreas = [
  '1 / 2 / 2 / 3',
  '2 / 3 / 3 / 4',
  '3 / 2 / 4 / 3',
  '2 / 1 / 3 / 2',
];

const positionTypes = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
const posNames = ['top', 'right', 'bottom', 'left'];

export function PositionPannel(
  props: TPosition & {
    onChange: (type: string, value: string | number) => void;
  }
) {
  const [type, setType] = useSafeState(props.position);
  const [zIndexType, setZIndexType] = useSafeState('auto');
  const [modalVisible, setModalVisible] = useSafeState(false);
  const [inputValue, setInputValue] = useSafeState<number | string>('');
  const [posName, setPosName] = useSafeState('');
  const pos = useReactive(['auto', 'auto', 'auto', 'auto']);

  const onPositionSelectChange = (e: SelectChangeEvent) => {
    setType(e.target.value as TPosition['position']);
    props.onChange('position', e.target.value);
  };

  const onZIndexSelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setZIndexType(value);
    if (value === 'auto') {
      props.onChange('zIndex', value);
    } else {
      props.onChange('zIndex', 1);
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
    setInputValue('');
  };

  const handlePosClick = (posName: string) => {
    const index = posName.indexOf(posName);
    setInputValue(pos[index]);
    setPosName(posName);
    setModalVisible(true);
  };

  const onInputChange = (value: string | number) => {
    if (typeof value === 'string') {
      if (isNaN(parseFloat(value))) {
        value = 'auto';
      } else {
        value = parseFloat(value);
      }
    }
    setInputValue(value);
    props.onChange(posName, value);
  };

  const handleClear = () => {
    setInputValue('auto');
    onInputChange('auto');
  };

  return (
    <>
      <Stack gap={2}>
        <Stack direction="row" gap={3} alignItems="center">
          <div>定位方式</div>
          <FormControl sx={{ width: '172px' }} variant="standard">
            <InputLabel id="label-position">position</InputLabel>
            <Select
              labelId="label-position"
              size="small"
              label="position"
              value={type}
              onChange={onPositionSelectChange}
            >
              {positionTypes.map((pos) => (
                <MenuItem value={pos} key={pos}>
                  {pos}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {type !== 'static' && (
          <>
            <Stack direction="row" alignItems="center" gap={1.2}>
              <div>层级设置：</div>
              <FormControl sx={{ width: '172px' }} variant="standard">
                <InputLabel id="label-zIndex">z-index</InputLabel>
                <Select
                  labelId="label-zIndex"
                  size="small"
                  label="z-index"
                  value={zIndexType}
                  onChange={onZIndexSelectChange}
                >
                  <MenuItem value="auto">auto</MenuItem>
                  <MenuItem value="custom">custom</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {zIndexType === 'custom' && (
              <Stack direction="row" justifyContent="flex-end">
                <TextField
                  sx={{ width: '172px' }}
                  variant="standard"
                  label="zIndex"
                  size="small"
                  type="number"
                  defaultValue={1}
                  onChange={(e) =>
                    props.onChange('zIndex', Number(e.target.value))
                  }
                />
              </Stack>
            )}
            <Stack direction="row" alignItems="center">
              <div>位置设置:</div>
              <PatternWrap>
                <SvgPositionPatterrn />
                {pos.map((name, index) => (
                  <PositionEdit
                    key={index}
                    sx={{ gridArea: gridAreas[index] }}
                    onClick={() => handlePosClick(posNames[index])}
                  >
                    {name}
                  </PositionEdit>
                ))}
              </PatternWrap>
            </Stack>
          </>
        )}
      </Stack>
      <Modal
        container={document.getElementById('attrPanelBox')}
        open={modalVisible}
        onClose={onModalClose}
        sx={{
          position: 'absolute',
          '.MuiBackdrop-root': { position: 'absolute' },
        }}
      >
        <Fade in={modalVisible}>
          <Box>
            <Typography id="transition-modal-title" variant="subtitle1">
              {posName} 设置
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ marginTop: '15px' }}
            >
              <TextField
                label="输入值"
                size="small"
                type={typeof inputValue === 'string' ? 'text' : 'number'}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClear}>
                      <ClearIcon sx={{ fontSize: '14px' }} />
                    </IconButton>
                  ),
                }}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
              />
              <MBox sx={{ marginLeft: '10px' }}>px</MBox>
            </Stack>
            <Typography
              id="transition-modal-title"
              variant="body2"
              sx={{ marginTop: '15px' }}
            >
              预设值
            </Typography>

            <PersetContainer>
              <PresetValue
                sx={{ width: '60px', height: '60px' }}
                onClick={() => onInputChange('auto')}
              >
                auto
              </PresetValue>
              <PresetFlexBox>
                {[0, 10, 20, 40, 60, 100, 140, 220].map((number) => (
                  <PresetValue
                    key={number}
                    sx={{ width: '22%', height: '26px', marginLeft: '3%' }}
                    onClick={() => onInputChange(number)}
                  >
                    {number}
                  </PresetValue>
                ))}
              </PresetFlexBox>
            </PersetContainer>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
