import { TBoxStyle, TTextStyle } from '../types/style';

export const defaultBoxStyle: TBoxStyle = {
  basic: {
    width: 150,
    height: 50,
    margin: 0,
    padding: 0,
    opacity: 1,
  },
  boxShadow: {
    boxShadowInset: false,
    boxShadowOffsetX: 0,
    boxShadowOffsetY: 0,
    boxShadowBlurRadius: 0,
    boxShadowSpreadRadius: 0,
    boxShadowColor: 'transparent',
  },
  background: {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 0,
    backgroundPositionY: 0,
  },
  border: {
    borderStyle: 'none',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
  },
};

export const defaultTextStyle: TTextStyle = {
  font: {
    color: '#000',
    fontSize: 16,
    fontFamily:
      'Helvetica,Tahoma,Arial,STXihei,"华文细黑","Microsoft YaHei","微软雅黑",sans-serif',
    fontWeight: 'normal',
  },
};
