import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  StackProps,
  Tooltip,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { useLatest, useSafeState, useUpdateEffect } from 'ahooks';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'root/renderer/src/components/Image';
import InputWithUnit from 'root/renderer/src/components/InputWithUnit';
import { TBackground } from 'root/renderer/src/materials/types/style';
import editorStore from 'root/renderer/src/store/editor';
import {
  extractCssValue,
  getFiles,
  getFolderChain,
  isValidCssValue,
} from 'root/renderer/src/utils';
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

type TBackgroundSize = 'auto' | 'cover' | 'contain' | 'custom';
type TBackgroundPosition = 'left' | 'center' | 'right' | 'custom';
type TFormValue = TBackground & {
  backgroundSizeWidth: number;
  backgroundSizeHeight: number;
};
type TProps = TBackground & { onChange: (data: TBackground) => void };

const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))({});

const ImageAction = styled(StackFlex)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'none',
});

const ImageBox = styled('div')({
  position: 'relative',
  ':hover': {
    '.MuiStack-root': {
      display: 'block',
    },
  },
});

const backgroundSizes = ['auto', 'cover', 'contain', 'custom'];
const backgroundRepeatTypes = [
  'repeat-x',
  'repeat-y',
  'repeat',
  'space',
  'round',
  'no-repeat',
];
const backgroundPositionTypes = ['left', 'center', 'right', 'custom'];
const backgroundClipTypes = [
  'border-box',
  'padding-box',
  'content-box',
  'text',
];

let subscription: Subscription | null = null;

export function BackgroundPannel(props: TProps) {
  const { onChange, ...restProps } = props;
  const [sizeType, setSizeType] = useSafeState<TBackgroundSize>(() => {
    const { backgroundSize } = props;
    return Array.isArray(backgroundSize) ? 'custom' : backgroundSize;
  });
  const [positionXType, setPositionXType] = useSafeState<TBackgroundPosition>(
    () => {
      const { backgroundPositionX } = props;
      return isValidCssValue(backgroundPositionX)
        ? 'custom'
        : (backgroundPositionX as TBackgroundPosition);
    }
  );
  const [positionYType, setPositionYType] = useSafeState<TBackgroundPosition>(
    () => {
      const { backgroundPositionY } = props;
      return isValidCssValue(backgroundPositionY)
        ? 'custom'
        : (backgroundPositionY as TBackgroundPosition);
    }
  );
  const lastestSizeType = useLatest(sizeType);
  const lastestPosXType = useLatest(positionXType);
  const lastestPosYType = useLatest(positionYType);
  const unitRef = useRef({
    width: 'px',
    height: 'px',
    'position-x': 'px',
    'position-y': 'px',
  });
  const { watch, register, control, getValues, setValue } = useForm<TFormValue>(
    {
      defaultValues: (function getDefaultValue() {
        const { backgroundSize } = props;

        let backgroundPositionX = 0;
        let backgroundPositionY = 0;
        let backgroundSizeWidth = 0;
        let backgroundSizeHeight = 0;

        if (Array.isArray(backgroundSize)) {
          const { value: width, unit: wUnit } = extractCssValue(
            backgroundSize[0] as string
          );
          const { value: height, unit: hUnit } = extractCssValue(
            backgroundSize[1] as string
          );

          backgroundSizeWidth = width;
          backgroundSizeHeight = height;
          unitRef.current.width = wUnit;
          unitRef.current.height = hUnit;
        }

        if (isValidCssValue(props.backgroundPositionX)) {
          const { value, unit } = extractCssValue(props.backgroundPositionX);
          backgroundPositionX = value;
          unitRef.current['position-x'] = unit;
        }

        if (isValidCssValue(props.backgroundPositionY)) {
          const { value, unit } = extractCssValue(props.backgroundPositionY);
          backgroundPositionY = value;
          unitRef.current['position-y'] = unit;
        }

        return {
          ...restProps,
          backgroundSizeWidth,
          backgroundSizeHeight,
          backgroundPositionX,
          backgroundPositionY,
        };
      })(),
    }
  );
  const [dialogVisible, setDialogVisible] = useSafeState(false);
  const [currentFolderId, setCurrentFolderId] = useSafeState('');
  const [files, setFiles] = useSafeState<any[]>([]);
  const [folderChain, setFolderChain] = useSafeState<any[]>([]);
  const fileMap = useRef<FileMap>();
  const lastestFolderId = useLatest(currentFolderId);
  const fileBrowserRef = useRef<FileBrowserHandle>(null);
  const [disableSelectButton, setDisableSelectButton] = useSafeState(true);
  const [selectedImage, setSelectedImage] = useSafeState(
    getValues('backgroundImage')
  );

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

  const update = (data: TFormValue) => {
    const backgroundSize =
      lastestSizeType.current === 'custom'
        ? [
            data.backgroundSizeWidth + unitRef.current.width,
            data.backgroundSizeHeight + unitRef.current.height,
          ]
        : lastestSizeType.current;

    const backgroundPositionX =
      lastestPosXType.current === 'custom'
        ? data.backgroundPositionX + unitRef.current['position-x']
        : lastestPosXType.current;

    const backgroundPositionY =
      lastestPosYType.current === 'custom'
        ? data.backgroundPositionY + unitRef.current['position-y']
        : lastestPosYType.current;

    onChange({
      backgroundSize,
      backgroundPositionX,
      backgroundPositionY,
      backgroundColor: data.backgroundColor,
      backgroundImage: data.backgroundImage,
      backgroundRepeat: data.backgroundRepeat,
      backgroundClip: data.backgroundClip,
    } as TBackground);
  };

  const onUnitChange = (unit: string, name: string) => {
    (unitRef.current as any)[name] = unit;
    update(getValues());
  };

  const openDialog = () => setDialogVisible(true);

  const closeDialog = () => setDialogVisible(false);

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

    setSelectedImage(imagePath);
    setValue('backgroundImage', imagePath);
    update(getValues());
    closeDialog();
  };

  const handleDelete = () => {
    setSelectedImage('none');
    setValue('backgroundImage', 'none');
    update(getValues());
  };

  useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = watch((data) => {
      update(data as TFormValue);
    });
    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorStore.state.currentMaterial]);

  useUpdateEffect(() => {
    update(getValues());
  }, [sizeType, positionXType, positionYType]);

  useUpdateEffect(() => {
    getResource(commonStore.state.currentProjectPath).then((data) => {
      fileMap.current = data.fileMap;
      if (lastestFolderId.current === '') {
        setCurrentFolderId('image');
      }
      fileBrowserRef.current?.requestFileAction(useGiantThumbnails, {});
    });
  }, [dialogVisible]);

  useUpdateEffect(() => {
    if (fileMap.current) {
      setFiles(getFiles(currentFolderId, fileMap.current));
      setFolderChain(getFolderChain(currentFolderId, fileMap.current));
    }

    fileBrowserRef.current?.requestFileAction(useGiantThumbnails, {});
  }, [currentFolderId]);

  return (
    <>
      <Stack gap={2}>
        <StackFlex>
          <div>颜色</div>
          <input {...register('backgroundColor')} type="color" />
        </StackFlex>

        <StackFlex>
          <div>图片</div>
          <Stack direction="row" sx={{ width: '209px' }}>
            <ImageBox>
              <Image src={selectedImage} title="点击选择图片"  onClick={openDialog} />
              {selectedImage !== 'none' && (
                <ImageAction>
                  <Tooltip title="选择图片" arrow>
                    <IconButton onClick={openDialog}>
                      <ImageIcon sx={{ color: '#fff' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="删除背景图片" arrow>
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon sx={{ color: '#ef5350' }} />
                    </IconButton>
                  </Tooltip>
                </ImageAction>
              )}
            </ImageBox>
          </Stack>
        </StackFlex>

        <StackFlex>
          <div>尺寸</div>
          <Stack gap={2} sx={{ width: '209px' }}>
            <Stack gap={2}>
              <FormControl fullWidth>
                <InputLabel id="label-size">size</InputLabel>
                <Select
                  labelId="label-size"
                  size="small"
                  label="size"
                  value={sizeType}
                  onChange={(e) => {
                    setSizeType(e.target.value as TBackgroundSize);
                  }}
                >
                  {backgroundSizes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {sizeType === 'custom' && (
                <>
                  <InputWithUnit
                    {...register('backgroundSizeWidth')}
                    size="small"
                    label="width"
                    type="number"
                    onUnitChange={onUnitChange}
                    defaultUnit={unitRef.current.width}
                  />
                  <InputWithUnit
                    {...register('backgroundSizeHeight')}
                    size="small"
                    label="height"
                    onUnitChange={onUnitChange}
                    defaultUnit={unitRef.current.height}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </StackFlex>

        <StackFlex>
          <div>重复</div>
          <FormControl sx={{ width: '209px' }}>
            <InputLabel id="label-repeat">repeat</InputLabel>
            <Controller
              name="backgroundRepeat"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="label-repeat"
                  size="small"
                  label="repeat"
                >
                  {backgroundRepeatTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </StackFlex>

        <StackFlex>
          <div>剪裁</div>
          <FormControl sx={{ width: '209px' }}>
            <InputLabel id="label-clip">clip</InputLabel>
            <Controller
              name="backgroundClip"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="label-clip"
                  size="small"
                  label="clip"
                >
                  {backgroundClipTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </StackFlex>

        <StackFlex>
          <div>位置</div>
          <Stack gap={2} sx={{ width: '209px' }}>
            <Stack gap={2}>
              <Divider>x轴</Divider>
              <FormControl fullWidth>
                <InputLabel id="label-position-x">position</InputLabel>
                <Select
                  labelId="label-position-x"
                  size="small"
                  label="position"
                  value={positionXType}
                  onChange={(e) => {
                    setPositionXType(e.target.value as TBackgroundPosition);
                  }}
                >
                  {backgroundPositionTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {positionXType === 'custom' && (
                <InputWithUnit
                  {...register('backgroundPositionX')}
                  size="small"
                  label="position-x"
                  type="number"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitRef.current['position-x']}
                />
              )}
            </Stack>

            <Stack gap={2}>
              <Divider>y轴</Divider>
              <FormControl fullWidth>
                <InputLabel id="label-position-y">position</InputLabel>
                <Select
                  labelId="label-position-y"
                  size="small"
                  label="position"
                  value={positionYType}
                  onChange={(e) => {
                    setPositionYType(e.target.value as TBackgroundPosition);
                  }}
                >
                  {backgroundPositionTypes.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {positionYType === 'custom' && (
                <InputWithUnit
                  {...register('backgroundPositionY')}
                  size="small"
                  label="position-y"
                  type="number"
                  onUnitChange={onUnitChange}
                  defaultUnit={unitRef.current['position-y']}
                />
              )}
            </Stack>
          </Stack>
        </StackFlex>
      </Stack>

      <Dialog
        maxWidth="md"
        TransitionComponent={Transition}
        open={dialogVisible}
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
    </>
  );
}
