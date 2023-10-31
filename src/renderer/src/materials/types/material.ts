import { TStyle } from './style';

export const enum EMaterialName {
  Image = 'Image',
  Text = 'Mext',
  Button = 'Button',
}

export interface IMaterial<Attribute> {
  id: string;
  name: EMaterialName;
  property: {
    style: TStyle;
    attribute: {
      id: string;
      className: string;
    } & Attribute;
    animations: any;
    events: any;
  };
}

export type TMaterialProps<Attribute extends object = any> =
  IMaterial<Attribute>['property'];
