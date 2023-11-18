import { TStyle } from '../types/style';
import createDefaultStyle from '../utils/createDefaultStyle';

const style: TStyle = createDefaultStyle({
  layout: {
    display: 'inline-block',
  },
  size: {
    width: '300px',
    height: '150px',
  },
});

export default style;
