import { Box, Button, Dialog, DialogActions } from '@mui/material';
import { useLatest, useSafeState, useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
import { getFiles, getFolderChain } from 'root/renderer/src/utils';
import {
  ChonkyActions,
  ChonkyFileActionData,
  ChonkyIconName,
  FileBrowser,
  FileBrowserHandle,
  FileData,
  FileHelper,
  FileList,
  FileNavbar,
  FileViewMode,
  defineFileAction,
} from '@aperturerobotics/chonky';
import { ChonkyIconFA } from '@aperturerobotics/chonky-icon-fontawesome';
import { getResource } from 'root/renderer/src/api';
import commonStore from 'root/renderer/src/store/common';
import { FileMap } from 'root/main/api/project';
import Transition from 'root/renderer/src/components/modal/Transition';
import modalStore from 'root/renderer/src/store/modal';
import { useSnapshot } from 'valtio';

export default function ResourceSelectModal(props: {
  type: 'image' | 'video';
  onSelect: (path: string) => void;
}) {
  const snap = useSnapshot(modalStore.state);
  const [currentFolderId, setCurrentFolderId] = useSafeState('');
  const [files, setFiles] = useSafeState<any[]>([]);
  const [folderChain, setFolderChain] = useSafeState<any[]>([]);
  const fileMap = useRef<FileMap>();
  const lastestFolderId = useLatest(currentFolderId);
  const fileBrowserRef = useRef<FileBrowserHandle>(null);
  const [disableSelectButton, setDisableSelectButton] = useSafeState(true);

  const useGiantThumbnails = defineFileAction({
    id: 'use_giant_thumbnails',
    fileViewConfig: {
      mode: FileViewMode.Grid,
      entryWidth: 150,
      entryHeight: 150,
    },
    button: {
      name: 'Switch to Grid',
      toolbar: true,
      contextMenu: false,
      group: 'Options',
      icon: ChonkyIconName.largeThumbnail,
    },
  });

  const closeDialog = () => modalStore.toggleResourceSelectModal(false);

  const handleFileAction = async (data: ChonkyFileActionData) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { targetFile, files } = data.payload;
      const fileToOpen = targetFile ?? files[0];
      if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
        setCurrentFolderId(fileToOpen.id);
      }
    } else if (data.id === ChonkyActions.ChangeSelection.id) {
      const { selectedFiles } = data.state;
      if (selectedFiles.length > 1) {
        const lastFile = selectedFiles[selectedFiles.length - 1];
        const selection = new Set<string>();
        if (!FileHelper.isDirectory(lastFile)) {
          selection.add((lastFile as FileData).id);
          setDisableSelectButton(true);
        } else {
          setDisableSelectButton(false);
        }

        fileBrowserRef.current?.setFileSelection(selection);
      } else if (selectedFiles.length === 1) {
        const file = selectedFiles[0];
        if (FileHelper.isDirectory(file)) {
          fileBrowserRef.current?.setFileSelection(new Set());
          setDisableSelectButton(true);
        } else {
          setDisableSelectButton(false);
        }
      } else {
        setDisableSelectButton(true);
      }
    }
  };

  const handleSelectImage = () => {
    const selectedId = [
      ...(fileBrowserRef.current?.getFileSelection() as any),
    ][0];
    const imagePath = fileMap.current![selectedId].thumbnailUrl!;

    props.onSelect(imagePath);
    closeDialog();
  };

  useUpdateEffect(() => {
    getResource(commonStore.state.currentProjectPath).then((data) => {
      fileMap.current = data.fileMap;
      if (lastestFolderId.current === '') {
        setCurrentFolderId(props.type);
      }
      fileBrowserRef.current?.requestFileAction(useGiantThumbnails, {});
    });
  }, [snap.ResourceSelectModalOpen]);

  useUpdateEffect(() => {
    if (fileMap.current) {
      setFiles(getFiles(currentFolderId, fileMap.current));
      setFolderChain(getFolderChain(currentFolderId, fileMap.current));
    }

    fileBrowserRef.current?.requestFileAction(useGiantThumbnails, {});
  }, [currentFolderId]);

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      open={snap.ResourceSelectModalOpen}
      onClose={closeDialog}
    >
      <Box sx={{ width: '670px', height: '500px' }}>
        <FileBrowser
          ref={fileBrowserRef}
          iconComponent={ChonkyIconFA}
          disableDragAndDrop={true}
          files={files}
          folderChain={folderChain}
          defaultFileViewActionId={useGiantThumbnails.id}
          onFileAction={handleFileAction}
          disableDefaultFileActions={[ChonkyActions.SelectAllFiles.id]}
        >
          <FileNavbar />
          <FileList />
        </FileBrowser>
      </Box>
      <DialogActions>
        <Button onClick={closeDialog}>取消</Button>
        <Button disabled={disableSelectButton} onClick={handleSelectImage}>
          确定选择
        </Button>
      </DialogActions>
    </Dialog>
  );
}
