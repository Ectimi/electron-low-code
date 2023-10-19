import { TStyle } from '../types/style';

export const defaultMaterialStyle: TStyle = {
  layout: {
    display: 'block',
    flexLayout: {
      container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alinContent: 'stretch',
      },
      item: {
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
      },
    },
  },
  position: {
    position: 'static',
    zIndex: 'auto',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  },
  gap: {
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
  },
  size: {
    width: 100,
    height: 40,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 'none',
    maxHeight: 'none',
    overflow: 'visible',
    objectFit: 'fill',
  },
  text: {
    color: '#000000',
    lineHeight: 1.2,
    fontSize: 16,
    fontFamily:
      'Helvetica,Tahoma,Arial,STXihei,"华文细黑","Microsoft YaHei","微软雅黑",sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'left',
    textDecoration: 'none',
  },
  background: {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundClip: 'border-box',
  },
  effect: {
    outline: {
      width: 0,
      color: '#333333',
      style: 'none',
    },
    opacity: 1,
    cursor: 'default',
    boxShadow: {
      boxShadowInset: false,
      boxShadowOffsetX: 0,
      boxShadowOffsetY: 0,
      boxShadowBlurRadius: 0,
      boxShadowSpreadRadius: 0,
      boxShadowColor: '#ffffff',
    },
  },
};
