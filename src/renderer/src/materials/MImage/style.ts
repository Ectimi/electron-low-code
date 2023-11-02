import { TStyle } from '../types/style';
import createDefaultStyle from '../utils/createDefaultStyle';

const style: TStyle = createDefaultStyle({
  layout: {
    display: 'inline-block',
  },
  size: {
    width: 300,
    height: 150,
  },
});

export default style;
