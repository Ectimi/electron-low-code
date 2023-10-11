import { TStyle } from './style';

export const enum EMaterialName {
  MImage = 'MImage',
  MText = 'MText',
  MButton = 'MButton',
}

export interface IMaterial {
  id: string;
  name: EMaterialName;
  property: {
    style: TStyle;
    animations: any;
    events: any;
  };
}

export type TMaterialProps = IMaterial['property'];
