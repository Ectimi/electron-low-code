import { TStyle } from '../types/style';
import createDefaultStyle from '../utils/createDefaultStyle';

const style: TStyle = createDefaultStyle({
  layout: {
    display: 'inline-flex',
    flexLayout: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  size: {
    width: 100,
    height: 35,
  },
  background: {
    backgroundColor: '#3f7ef7',
  },
  text: {
    color: '#ffffff',
  },
  effect: {
    cursor: 'pointer',
  },
});

export default style;
