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
import { ChangeEventHandler, Fragment } from 'react';
import { useImmer } from "use-immer";
import { useSafeState } from 'ahooks';
import SvgBoxPattern from './SvgBoxPattern';
import { TGap, TGapValue } from 'root/renderer/src/materials/types/style';

type TGapControllerHandle = (gapName: string) => void;
const SpacingEdit = styled('div')({
  padding: '2px 4px',
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
const gapPos = ['top', 'right', 'bottom', 'right'];

const MarginController = (props: {
  margins: number[];
  onClick: TGapControllerHandle;
}) => {
  const { margins } = props;

  return (
    <Fragment>
      {margins.map((val, index) => (
        <SpacingEdit
          key={index}
          sx={{ gridArea: gridAreas[index] }}
          onClick={() => props.onClick('margin-' + gapPos[index])}
        >
          {val}
        </SpacingEdit>
      ))}
    </Fragment>
  );
};
MarginController.displayName = 'MarginController';

const PaddingController = (props: {
  paddings: number[];
  onClick: TGapControllerHandle;
}) => {
  const { paddings } = props;

  return (
    <Fragment>
      {paddings.map((val, index) => (
        <SpacingEdit
          key={index}
          sx={{ gridArea: gridAreas[index] }}
          onClick={() => props.onClick('padding-' + gapPos[index])}
        >
          {val}
        </SpacingEdit>
      ))}
    </Fragment>
  );
};
PaddingController.displayName = 'PaddingController';

const Box = styled(MBox)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '90%',
  borderRadius: '4px',
  padding: '15px',
  backgroundColor: '#fff',
});

const PersetContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '15px',
});

const PresetValue = styled('div')({
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

const PresetFlexBox = styled('div')({
  width: 'calc(100% - 60px)',
  height: '60px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'space-between',
});

export type TProps = {
  onChange: (gapType: keyof TGap, value: TGapValue) => void;
};

export function GapPannel(props: TProps) {
  const [modalVisible, setModalVisible] = useSafeState(false);
  const [gapName, setGapName] = useSafeState('');
  const [inputValue, setInputValue] = useSafeState<number | string>('');
  const [margins,setMargins] = useImmer([0, 0, 0, 0])
  const [paddings,setPaddings] = useImmer([0, 0, 0, 0])

  const gapControllerHandle: TGapControllerHandle = (gapName) => {
    setGapName(gapName);
    setModalVisible(true);
  };

  const onInputChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
    const value = parseFloat(e.target.value)
    setInputValue(value)
    console.log('change');
    
    if(gapName.startsWith('margin')){
        setMargins(draft=>{
            const updateIndex = gapPos.indexOf(gapName.split('-')[1])
            draft[updateIndex] = value
            console.log('draft',draft);
            
        })
    }
  }

  return (
    <>
      <SvgBoxPattern>
        <MarginController margins={margins} onClick={gapControllerHandle} />
        <PaddingController
          paddings={paddings}
          onClick={gapControllerHandle}
        />
      </SvgBoxPattern>

      <Modal
        container={document.getElementById('attrPanelBox')}
        open={modalVisible}
        onClose={() => setModalVisible(false)}
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
                type={inputValue === 'auto' ? 'text' : 'number'}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setInputValue('')}>
                      <ClearIcon sx={{ fontSize: '14px' }} />
                    </IconButton>
                  ),
                }}
                value={inputValue}
                onChange={onInputChange}
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
                onClick={() => setInputValue('auto')}
              >
                auto
              </PresetValue>
              <PresetFlexBox>
                {[0, 10, 20, 40, 60, 100, 140, 220].map((number) => (
                  <PresetValue
                    key={number}
                    sx={{ width: '22%', height: '26px', marginLeft: '3%' }}
                    onClick={() => setInputValue(number)}
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
