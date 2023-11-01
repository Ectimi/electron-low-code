import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  StackProps,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@/components/Accordion';
import Image from '@/components/Image';
import { useForm, Controller } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import editorStore from '@/store/editor';
import { Fragment, useEffect } from 'react';
import { IMaterial } from '@/materials/types/material';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import modalStore from '../../store/modal';
import ResourceSelectModal from '../../components/modal/ResourceSelectModal';
import { useSafeState } from 'ahooks';
import { TImageAttribute } from '../../materials/MImage/props';

interface IForm {
  id: string;
  className: string;
  text?: string;
  url?: string;
  objectFix?: TImageAttribute['objectFix'];
}

const objectFixTypes = ['contain', 'fill', 'cover', 'scale-down', 'none'];

const StackFlex = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" gap={2} {...props} />
))({});

const ImageBox = styled('div')({
  position: 'relative',
  ':hover': {
    '.MuiStack-root': {
      display: 'block',
    },
  },
});

const ImageAction = styled(StackFlex)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'none',
});

let subscription: Subscription | null = null;

export default function AttributePanelRenderer() {
  const editorSnap = useSnapshot(editorStore.state);
  const [attribute, setAttribute] = useSafeState<
    IMaterial['property']['attribute']
  >(editorStore.getProperty(editorSnap.currentMaterial!)!.attribute || {});
  const { watch, control, reset, setValue } = useForm<IForm>({
    defaultValues: {
      id: attribute.id || '',
      className: attribute.className || '',
      text: attribute.text || '',
      url: attribute.url || '',
      objectFix: 'contain',
    },
  });

  const openDialog = () => modalStore.toggleResourceSelectModal(true);

  const onSelect = (imagePath: string) => {
    setValue('url', imagePath);
  };

  const update = (data: IForm) => {
    const obj: any = {};
    const attribute = editorStore.getProperty(
      editorSnap.currentMaterial!
    )!.attribute;
    for (const key in data) {
      if (key in attribute) {
        obj[key] = (data as any)[key];
      }
    }
    editorStore.updateMaterialAttribute(editorSnap.currentMaterial!, obj);
    setAttribute(obj);
  };

  useEffect(() => {
    reset();
    if (editorSnap.currentMaterial) {
      const attribute = editorStore.getProperty(
        editorSnap.currentMaterial!
      )!.attribute;
      setAttribute(attribute);
      for (const key in attribute) {
        setValue(key as any, attribute[key]);
      }
    }

    if (subscription) {
      subscription.unsubscribe();
    }

    subscription = watch((data) => {
      update(data as IForm);
    });

    return () => subscription!.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, editorSnap.currentMaterial]);

  return (
    <Fragment>
      <Accordion disableGutters elevation={0} square defaultExpanded>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        >
          <Typography variant="subtitle2">基础属性</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack gap={2}>
            <StackFlex>
              <div>ID</div>
              <FormControl sx={{ width: '209px', marginLeft: '15px' }}>
                <Controller
                  name="id"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="text" size="small" label="id" />
                  )}
                />
              </FormControl>
            </StackFlex>

            <StackFlex>
              <div>类名</div>
              <FormControl sx={{ width: '209px' }}>
                <Controller
                  name="className"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      size="small"
                      label="className"
                    />
                  )}
                />
              </FormControl>
            </StackFlex>

            {'text' in attribute && (
              <StackFlex>
                <div>文本</div>
                <FormControl sx={{ width: '209px' }}>
                  <Controller
                    name="text"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        label="text"
                        multiline
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => setValue('text', '')}>
                              <ClearIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              </StackFlex>
            )}

            {'url' in attribute && (
              <>
                <StackFlex>
                  <div>填充</div>
                  <FormControl sx={{ width: '209px' }}>
                    <InputLabel id="label-objectFix">object-fit</InputLabel>
                    <Controller
                      name="objectFix"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="label-objectFix"
                          size="small"
                          label="object-fit"
                        >
                          {objectFixTypes.map((name) => (
                            <MenuItem value={name} key={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </StackFlex>

                <StackFlex>
                  <div>图片</div>
                  <ImageBox sx={{ width: '209px' }}>
                    <Image
                      src={attribute.url}
                      title="点击选择图片"
                      onClick={openDialog}
                    />
                    {attribute.url && (
                      <ImageAction>
                        <Tooltip title="选择图片" arrow>
                          <IconButton onClick={openDialog}>
                            <ImageIcon sx={{ color: '#fff' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="删除背景图片" arrow>
                          <IconButton onClick={() => setValue('url', '')}>
                            <DeleteIcon sx={{ color: '#ef5350' }} />
                          </IconButton>
                        </Tooltip>
                      </ImageAction>
                    )}
                  </ImageBox>
                </StackFlex>
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <ResourceSelectModal type="image" onSelect={onSelect} />
    </Fragment>
  );
}
