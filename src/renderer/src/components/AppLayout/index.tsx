import { PropsWithChildren, forwardRef } from 'react';
import { Header } from '../Header';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Slide,
  Stack,
  Tooltip,
  styled,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FolderIcon from '@mui/icons-material/Folder';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { TransitionProps } from '@mui/material/transitions';
import modalStore from '@/store/modal';
import { createProject, selectFloder } from '@/api';
import { useForm, Controller } from 'react-hook-form';
import showMessage from '../Message';
import { ICreateProjectParams } from 'root/types/ParamsType';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FilefolderInput = styled(Input)({
  '&.Mui-disabled,.MuiInputBase-input': {
    color: 'inherit',
    cursor: 'pointer',
  },
});

const InputTip = styled('div')({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '12px',
  marginTop: '6px',
});

export default function AppLayout(props: PropsWithChildren<any>) {
  const snap = modalStore.getSnapshot();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ICreateProjectParams>();
  const handleClose = (_?: any, reason?: string) => {
    if (reason === 'backdropClick') return;
    modalStore.toggleCreateProjectModal(false);
    reset();
  };
  const handleSelectFolder = async () => {
    const path = await selectFloder();
    setValue('projectPath', path);
  };
  const onSubmit = async (data: ICreateProjectParams) => {
    handleClose();
    try {
      const res = await createProject(data);
      showMessage({ content: res });
      location.hash = '#/editor';
    } catch (error: any) {
      showMessage({ content: error, type: 'error' });
    }
  };

  return (
    <>
      <Header />
      {props.children}

      <Dialog
        open={snap.CreateProjectModalOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle sx={{ width: '400px' }}>新建项目</DialogTitle>
        <DialogContent>
          <Stack>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel>项目名称</InputLabel>
              <Controller
                name="projectName"
                control={control}
                defaultValue=""
                rules={{ required: '项目名称不能为空' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    startAdornment={
                      <DriveFileRenameOutlineIcon
                        sx={{ marginRight: '20px' }}
                      />
                    }
                  />
                )}
              />
              {errors.projectName && (
                <span style={{ color: 'red' }}>
                  {errors.projectName.message}
                </span>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel>项目路径</InputLabel>
              <Controller
                name="projectPath"
                control={control}
                defaultValue=""
                rules={{ required: '项目路径不能为空' }}
                render={({ field }) => (
                  <Tooltip title={field.value} placement="top">
                    <FilefolderInput
                      startAdornment={
                        <FolderIcon sx={{ marginRight: '20px' }} />
                      }
                      placeholder="请点击选择项目路径"
                      disabled
                      onClick={handleSelectFolder}
                      {...field}
                    />
                  </Tooltip>
                )}
              />
              {errors.projectPath && (
                <span style={{ color: 'red' }}>
                  {errors.projectPath.message}
                </span>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel>项目资源文件夹名称</InputLabel>
              <Controller
                name="assetFolderName"
                control={control}
                defaultValue="assets"
                render={({ field }) => (
                  <Input
                    {...field}
                    startAdornment={
                      <PermMediaIcon sx={{ marginRight: '20px' }} />
                    }
                    placeholder=""
                  />
                )}
              />
              <InputTip>资源文件夹的名称，默认为"assets"</InputTip>
            </FormControl>
            <DialogActions>
              <Button autoFocus sx={{color:'#d32f2f'}} onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleSubmit(onSubmit)} autoFocus>
                确定
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
