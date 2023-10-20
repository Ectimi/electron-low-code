import { Dialog, DialogTitle, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import modalStore from 'root/renderer/src/store/modal';
import { useSnapshot } from 'valtio';
import Transition from '../Transition';

const DialogCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: theme.palette.grey[500],
}));

export function ResourceLibraryModal() {
  const snap = useSnapshot(modalStore.state);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={snap.ResourceLibraryModalOpen}
      onClose={() => modalStore.toggleResourceLibraryModal(false)}
    >
      <DialogTitle>资源库</DialogTitle>
      <DialogCloseButton>
        <CloseIcon />
      </DialogCloseButton>
    </Dialog>
  );
}
