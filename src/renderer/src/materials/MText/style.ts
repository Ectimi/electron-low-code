import { TStyle } from '../types/style';
import createDefaultStyle from '../utils/createDefaultStyle';

const style: TStyle = createDefaultStyle({
  size:{
    width:'auto',
    height:'auto'
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default style;