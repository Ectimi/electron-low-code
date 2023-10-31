import { useSafeState } from 'ahooks';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ImageIcon from '@mui/icons-material/Image';
import { Tooltip, styled } from '@mui/material';

type ImageProps = {
  src: string;
  title?: string;
  [key: string]: any;
};

const ErrorBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const Img = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export default function Image(props: ImageProps) {
  const { src, title, ...otherProps } = props;
  const [error, setError] = useSafeState(false);

  return src === 'none' ? (
    <Tooltip title={title ? title : null} arrow>
      <ImageIcon fontSize="large" sx={{ cursor: 'pointer' }} {...otherProps} />
    </Tooltip>
  ) : error ? (
    <ErrorBox>
      <BrokenImageIcon fontSize="large" />
      <div>图片加载失败</div>
    </ErrorBox>
  ) : (
    <Img src={src} onError={() => setError(true)} {...otherProps} />
  );
}
