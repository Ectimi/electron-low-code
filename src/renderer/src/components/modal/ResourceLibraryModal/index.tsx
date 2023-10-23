import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import {
  ChonkyActions,
  ChonkyFileActionData,
  FileBrowser,
  FileContextMenu,
  FileHelper,
  FileList,
  FileNavbar,
  FileToolbar,
} from 'chonky';
import CloseIcon from '@mui/icons-material/Close';
import modalStore from 'root/renderer/src/store/modal';
import { useSnapshot } from 'valtio';
import Transition from '../Transition';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { useMount, useSafeState, useUpdateEffect } from 'ahooks';
import { subscribeKey } from 'valtio/utils';
import { getResource } from 'root/renderer/src/api';
import commonStore from 'root/renderer/src/store/common';
import { FileMap } from 'root/main/api/project';
import { useRef } from 'react';

setChonkyDefaults({ iconComponent: ChonkyIconFA as any });

const DialogCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: theme.palette.grey[500],
}));

const getFiles = (currentFolderId: string, fileMap: FileMap) => {
  const currentFolder = fileMap[currentFolderId];
  const files = currentFolder.childrenIds
    ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
    : [];

  return files;
};

const getFolderChain = (currentFolderId: string, fileMap: FileMap) => {
  const currentFolder = fileMap[currentFolderId];
  const folderChain = [currentFolder];

  let parentId: any = currentFolder.parentId;
  while (parentId) {
    const parentFile = fileMap[parentId];
    if (parentFile) {
      folderChain.unshift(parentFile);
      parentId = parentFile.parentId;
    } else {
      parentId = null;
    }
  }

  return folderChain;
};

export function ResourceLibraryModal() {
  const snap = useSnapshot(modalStore.state);
  const [currentFolderId, setCurrentFolderId] = useSafeState('');
  const [files, setFiles] = useSafeState<any[]>([]);
  const [folderChain, setFolderChain] = useSafeState<any[]>([]);
  const fileMap = useRef<FileMap>();

  const handleFileAction = (data: ChonkyFileActionData) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { targetFile, files } = data.payload;
      const fileToOpen = targetFile ?? files[0];
      if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
        setCurrentFolderId(fileToOpen.id);

        return;
      }
    }
  };

  useMount(() => {
    subscribeKey(modalStore.state, 'ResourceLibraryModalOpen', (isOpen) => {
      if (isOpen) {
        getResource(commonStore.state.currentProjectPath).then((data) => {
          console.log(data.fileMap);

          fileMap.current = data.fileMap;

          setCurrentFolderId(data.rootFolderId);
          setFiles(getFiles(data.rootFolderId, data.fileMap));
          setFolderChain(getFolderChain(data.rootFolderId, data.fileMap));
        });
      }
    });
  });

  useUpdateEffect(() => {
    if (fileMap.current) {
      setFiles(getFiles(currentFolderId, fileMap.current));
      setFolderChain(getFolderChain(currentFolderId, fileMap.current));
    }
  }, [currentFolderId]);

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      open={snap.ResourceLibraryModalOpen}
      onClose={() => modalStore.toggleResourceLibraryModal(false)}
    >
      <Box sx={{width:'700px',height:'500px'}}>
        <FileBrowser
          disableDragAndDrop={true}
          files={files}
          folderChain={folderChain}
          onFileAction={handleFileAction}
        >
          <FileNavbar />
          <FileToolbar />
          <FileList />
          <FileContextMenu />
        </FileBrowser>
      </Box>
    </Dialog>
  );
}
