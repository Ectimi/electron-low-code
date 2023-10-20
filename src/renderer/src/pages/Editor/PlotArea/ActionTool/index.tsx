import { IconButton, Paper, Stack, Tooltip, styled } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PreviewIcon from '@mui/icons-material/Preview';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MouseEventHandler, ReactElement, cloneElement } from 'react';
import { useSnapshot } from 'valtio';
import editorStore from 'root/renderer/src/store/editor';

const ToolBox = styled(Paper)({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'max-content',
});

const ActionButton = (props: {
  title: string;
  icon: ReactElement;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const { title, icon, disabled = false, onClick } = props;

  return (
    <Tooltip title={title} arrow>
      <span>
        <IconButton disabled={disabled} onClick={onClick}>
          {cloneElement(icon, {
            fontSize: 'small',
            color: disabled ? 'disabled' : 'primary',
          })}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export function ActionTool() {
  const { currentMaterial } = useSnapshot(editorStore.state);
  const { value, canUndo, canRedo } = useSnapshot(editorStore.materialList);
  return (
    <ToolBox>
      <Stack gap={1} direction="row" alignItems="center">
        <ActionButton title="撤消" icon={<UndoIcon />} disabled={!canUndo()} />

        <ActionButton title="重做" icon={<RedoIcon />} disabled={!canRedo()} />

        <ActionButton
          title="删除"
          icon={<DeleteIcon />}
          disabled={value.length === 0 && currentMaterial === null}
        />

        <ActionButton
          title="复制"
          icon={<ContentCopyIcon />}
          disabled={value.length === 0 && currentMaterial === null}
        />

        <ActionButton
          title="预览"
          icon={<PreviewIcon />}
          disabled={value.length === 0}
        />

        <ActionButton title="项目设置" icon={<SettingsIcon />} />
      </Stack>
    </ToolBox>
  );
}
