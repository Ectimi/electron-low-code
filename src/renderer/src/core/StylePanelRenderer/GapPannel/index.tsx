import {
  Box as MBox,
  Fade,
  Modal,
  TextField,
  Typography,
  styled,
  IconButton,
  Stack,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useImmer } from 'use-immer';
import { useSafeState } from 'ahooks';
import SvgBoxPattern from './SvgBoxPattern';
import {
  TGap,
  TGapValue,
  TStyle,
} from 'root/renderer/src/materials/types/style';

const SpacingEdit = styled('div')((props: { name: string }) => ({
  padding: '2px 4px',
  userSelect: 'none',
  fontSize: '10px',
  color: '#191919',
  placeSelf: 'center',
}));
const gridAreas = [
  '1 / 2 / 2 / 3',
  '2 / 3 / 3 / 4',
  '3 / 2 / 4 / 3',
  '2 / 1 / 3 / 2',
];
const gapPos = ['top', 'right', 'bottom', 'left'];

export const Box = styled(MBox)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '90%',
  borderRadius: '4px',
  padding: '15px',
  backgroundColor: '#fff',
});

export const PersetContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '15px',
});

export const PresetValue = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e5e5e5',
  border: '1px solid #c2c2c2',
  cursor: 'pointer',
  ':hover': {
    color: '#8bbefa',
    backgroundColor: 'rgba(76,152,241,.15)',
  },
});

export const PresetFlexBox = styled('div')({
  width: 'calc(100% - 60px)',
  height: '60px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'space-between',
});

export type TProps = TStyle['gap'] & {
  onChange: (gapType: keyof TGap, value: TGapValue) => void;
};

export function GapPannel(props: TProps) {
  const [modalVisible, setModalVisible] = useSafeState(false);
  const [gapName, setGapName] = useSafeState('');
  const [inputValue, setInputValue] = useSafeState<number | string>('');
  const [margins, setMargins] = useImmer<Array<number | string>>(props.margin);
  const [paddings, setPaddings] = useImmer<Array<number | string>>(
    props.padding
  );

  const onModalClose = () => {
    setModalVisible(false);
    setInputValue('');
  };

  const handleGapClick = (gapName: string) => {
    const [type, pos] = gapName.split('-');
    const index = gapPos.indexOf(pos);
    setInputValue(type === 'margin' ? margins[index] : paddings[index]);
    setGapName(gapName);
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
    if (gapName.startsWith('margin')) {
      setMargins((draft) => {
        const updateIndex = gapPos.indexOf(gapName.split('-')[1]);
        draft[updateIndex] = value;
        props.onChange('margin', draft);
      });
    } else if (gapName.startsWith('padding')) {
      setPaddings((draft) => {
        const updateIndex = gapPos.indexOf(gapName.split('-')[1]);
        draft[updateIndex] = value;
        props.onChange('padding', draft);
      });
    }
  };

  const handleClear = () => {
    setInputValue(0);
    onInputChange(0);
  };

  return (
    <>
      <SvgBoxPattern>
        {margins.map((val, index) => (
          <SpacingEdit
            key={index}
            name="margin"
            sx={{ gridArea: gridAreas[index] }}
            onClick={() => handleGapClick('margin-' + gapPos[index])}
          >
            {val}
          </SpacingEdit>
        ))}
        {paddings.map((val, index) => (
          <SpacingEdit
            key={index}
            name="padding"
            sx={{ gridArea: gridAreas[index] }}
            onClick={() => handleGapClick('padding-' + gapPos[index])}
          >
            {val}
          </SpacingEdit>
        ))}
      </SvgBoxPattern>

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
              间隔 {gapName} 设置
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
