import { TStyle } from './style';

export const enum EMaterialName {
  Image = 'Image',
  Text = 'Mext',
  Button = 'Button',
  Box = 'Box'
}

export interface IMaterial<Attribute = any> {
  id: string;
  name: EMaterialName;
  parentId:string | null;
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
