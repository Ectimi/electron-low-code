import { PropsWithChildren, forwardRef } from 'react';
import { Header } from '../Header';
import { Dialog, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import modalStore from '@/store/modal';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppLayout(props: PropsWithChildren<any>) {
  const snap = modalStore.getSnapshot();
  const handleClose = () => modalStore.toggleCreateProjectModal(false);

  return (
    <>
      <Header />
      {props.children}

      <Dialog
        open={snap.CreateProjectModalOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>新建项目</DialogTitle>
      </Dialog>
    </>
  );
}
