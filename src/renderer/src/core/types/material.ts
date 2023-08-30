import { ReactNode } from "react";

export const enum EMaterialName {
    MImage = 'MImage',
    MText = 'MText',
    MButton = 'MButton',
}

export interface IMaterialItem{
    name:EMaterialName;
}