import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  defineFileAction,
  ChonkyActions,
  ChonkyIconName,
  ChonkyFileActionData,
  FileBrowser,
  FileContextMenu,
  FileHelper,
  FileList,
  FileNavbar,
  FileToolbar,
  FileBrowserHandle,
  FileViewMode,
  FileAction,
} from '@aperturerobotics/chonky';
import modalStore from 'root/renderer/src/store/modal';
import { useSnapshot } from 'valtio';
import Transition from '../Transition';
import { ChonkyIconFA } from '@aperturerobotics/chonky-icon-fontawesome';
import { useLatest, useMount, useSafeState, useUpdateEffect } from 'ahooks';
import { subscribeKey } from 'valtio/utils';
import {
  deleteResource,
  getResource,
  importResource,
  selectResource,
} from 'root/renderer/src/api';
import commonStore from 'root/renderer/src/store/common';
import { FileMap } from 'root/main/api/project';
import { useRef } from 'react';
import showMessage from '../../Message';
import { getFiles, getFolderChain } from 'root/renderer/src/utils';

export function ResourceLibraryModal() {
  const snap = useSnapshot(modalStore.state);
  const fileBrowserRef = useRef<FileBrowserHandle>(null);
  const fileMap = useRef<FileMap>();
  const willDeleteFile = useRef<string[]>([]);
  const openedResourceType = useRef('');
  const [currentFolderId, setCurrentFolderId] = useSafeState('');
  const [files, setFiles] = useSafeState<any[]>([]);
  const [folderChain, setFolderChain] = useSafeState<any[]>([]);
  const [alertVisible, setAlertVisible] = useSafeState(false);
  const [fileActions, setFileActions] = useSafeState<FileAction[]>([]);
  const lastestFolderId = useLatest(currentFolderId);

  const deleteFile = defineFileAction({
    id: 'delete_file',
    requiresSelection: true,
    hotkeys: ['delete'],
    fileFilter: (file) => file?.name !== 'images' && file?.name !== 'videos',
    button: {
      name: 'Delete File',
      toolbar: true,
      contextMenu: true,
      icon: ChonkyIconName.trash,
    },
  });
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
  const importFile = defineFileAction({
    id: 'import_file',
    button: {
      name: 'Import File',
      toolbar: true,
      contextMenu: false,
      icon: ChonkyIconName.upload,
    },
  });

  const refreshFileBrowser = async () => {
    const data = await getResource(commonStore.state.currentProjectPath);
    fileMap.current = data.fileMap;

    setFiles(getFiles(currentFolderId, data.fileMap));
    setFolderChain(getFolderChain(currentFolderId, data.fileMap));
  };

  const handleFileAction = async (data: ChonkyFileActionData) => {
    if (data.id === ChonkyActions.OpenFiles.id) {
      const { targetFile, files } = data.payload;
      const fileToOpen = targetFile ?? files[0];
      if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
        setCurrentFolderId(fileToOpen.id);
      }
      if (targetFile?.name === 'images' || targetFile?.name === 'videos') {
        openedResourceType.current = targetFile.name;
      }
    } else if (data.id === deleteFile.id) {
      willDeleteFile.current = data.state.selectedFiles.map(
        (item) => (item as any).path
      );
      setAlertVisible(true);
    } else if (data.id === importFile.id) {
      try {
        const selectedFiles = await selectResource(
          openedResourceType.current as any
        );
        const res = await importResource({
          projectPath: commonStore.state.currentProjectPath,
          filePaths: selectedFiles,
          targetPath: fileMap.current![lastestFolderId.current].path!,
        });
        await refreshFileBrowser();
        showMessage({ content: res });
      } catch (error) {
        showMessage({ content: error as string, type: 'error' });
        console.log('import error', error);
      }
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    willDeleteFile.current = [];
  };

  const handleAlertConfirm = async () => {
    try {
      if (willDeleteFile.current.length) {
        await deleteResource(willDeleteFile.current);
        await refreshFileBrowser();
        showMessage({ content: '删除成功' });
      }
    } catch (error) {
      showMessage({ content: '删除失败', type: 'error' });
      console.log('删除资源失败：', error);
    } finally {
      handleAlertClose();
    }
  };

  useMount(() => {
    subscribeKey(modalStore.state, 'ResourceLibraryModalOpen', (isOpen) => {
      if (isOpen) {
        getResource(commonStore.state.currentProjectPath).then((data) => {
          fileMap.current = data.fileMap;
          if (lastestFolderId.current === '') {
            setCurrentFolderId(data.rootFolderId);
          }

          setFiles(getFiles(lastestFolderId.current, data.fileMap));
          setFolderChain(getFolderChain(lastestFolderId.current, data.fileMap));
        });
      } else {
        openedResourceType.current = '';
      }
    });
  });

  useUpdateEffect(() => {
    if (fileMap.current) {
      setFiles(getFiles(currentFolderId, fileMap.current));
      setFolderChain(getFolderChain(currentFolderId, fileMap.current));
    }

    if (currentFolderId === 'root') {
      setFileActions([deleteFile, useGiantThumbnails]);
    } else {
      setFileActions([deleteFile, useGiantThumbnails, importFile]);
    }
    fileBrowserRef.current?.requestFileAction(useGiantThumbnails, {});
  }, [currentFolderId]);

  return (
    <>
      <Dialog
        maxWidth="md"
        TransitionComponent={Transition}
        open={snap.ResourceLibraryModalOpen}
        onClose={() => modalStore.toggleResourceLibraryModal(false)}
      >
        <Box sx={{ width: '730px', height: '500px' }}>
          <FileBrowser
            ref={fileBrowserRef}
            iconComponent={ChonkyIconFA}
            disableDefaultFileActions={[
              ChonkyActions.ToggleHiddenFiles.id,
              ChonkyActions.EnableGridView.id,
            ]}
            disableDragAndDrop={true}
            files={files}
            folderChain={folderChain}
            fileActions={fileActions}
            onFileAction={handleFileAction}
            defaultFileViewActionId={useGiantThumbnails.id}
          >
            <FileNavbar />
            <FileToolbar />
            <FileList />
            <FileContextMenu />
          </FileBrowser>
        </Box>
      </Dialog>

      <Dialog
        open={alertVisible}
        TransitionComponent={Transition}
        onClose={(_?: any, reason?: string) => {
          if (reason === 'backdropClick') return;
          setAlertVisible(false);
        }}
      >
        <DialogTitle>提示</DialogTitle>
        <DialogContent sx={{ width: '400px' }}>
          确认要删除该文件吗？
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>取消</Button>
          <Button onClick={handleAlertConfirm} color="warning">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
