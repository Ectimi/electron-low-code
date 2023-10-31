import {
  Box,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@/components/Accordion';
import { useForm, Controller } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import editorStore from '@/store/editor';
import { Fragment, useEffect, useMemo } from 'react';
import { IMaterial } from '@/materials/types/material';
import { Subscription } from 'node_modules/react-hook-form/dist/utils/createSubject';
import ImagePng from '@/assets/image.png';
import modalStore from '../../store/modal';
import ResourceSelectModal from '../../components/modal/ResourceSelectModal';

interface IForm {
  id: string;
  className: string;
  text?: string;
  url?: string;
}

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 0',
  cursor: 'pointer',
  ':after': {
    content: '"点击选择图片"',
    height: '100px',
    display: 'none',
    color: theme.palette.primary.light,
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '100px',
  },
  ':hover': {
    ':after': {
      display: 'block',
    },
  },
}));

let subscription: Subscription | null = null;

export default function AttributePanelRenderer() {
  const editorSnap = useSnapshot(editorStore.state);
  const attribute = useMemo<IMaterial['property']['attribute']>(() => {
    return editorSnap.currentMaterial
      ? editorStore.getConfiguration(editorSnap.currentMaterial!)!.attribute
      : {};
  }, [editorSnap.currentMaterial]);
  const { watch, register, control, getValues, setValue } = useForm<IForm>({
    defaultValues: {
      id: attribute.id || '',
      className: attribute.className || '',
      text: attribute.text || '',
      url: attribute.url || '',
    },
  });

  const onSelect = (imagePath: string) => {
    setValue('url', imagePath);
  };

  useEffect(() => {
    if (subscription) {
      subscription.unsubscribe();
    }

    subscription = watch((data) => {
      const obj: any = {};
      for (const key in data) {
        if (key in attribute) {
          console.log(key, (data as any)[key]);

          obj[key] = attribute[key];
        }
      }
      editorStore.updateMaterialAttribute(editorSnap.currentMaterial!, obj);
    });

    for (const key in attribute) {
      setValue(key as any, attribute[key]);
    }

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
            <FormControl fullWidth>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="text" size="small" label="id" />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
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

            {attribute.text && (
              <FormControl fullWidth>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      size="small"
                      label="text"
                    />
                  )}
                />
              </FormControl>
            )}

            {'url' in attribute && (
              <>
                <Divider textAlign="left">图片链接</Divider>
                <ImageBox
                  sx={{
                    backgroundImage: `url('${attribute.url || ImagePng}')`,
                  }}
                  onClick={() => modalStore.toggleResourceSelectModal(true)}
                ></ImageBox>
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <ResourceSelectModal type="image" onSelect={onSelect} />
    </Fragment>
  );
}
