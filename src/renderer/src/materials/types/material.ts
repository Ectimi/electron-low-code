import { TStyle } from './style';

export const enum EMaterialName {
  Image = 'Image',
  Text = 'Text',
  Button = 'Button',
  Box = 'Box'
}

export interface IMaterial<Attribute = any> {
  id: string;
  name: EMaterialName;
  parentId:string | null;
  children?:IMaterial[];
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
