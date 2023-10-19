import { TStyle } from './style';

export const enum EMaterialName {
  Image = 'Image',
  Text = 'Mext',
  Button = 'Button',
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
