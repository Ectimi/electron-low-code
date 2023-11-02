import { createSvgIcon } from '@mui/material';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { PropsWithChildren } from 'react';

const Svg = (props: PropsWithChildren<any>) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
      {props.children}
    </svg>
  );
};
export const DisplayBlockIcon = createSvgIcon(
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 4h12v8H2V4zm10 2H4v4h8V6z"
    ></path>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 1h12v1H2V1zm0 13h12v1H2v-1z"
    ></path>
  </Svg>,
  'display-block'
);

export const DisplayFlexIcon = createSvgIcon(
  <Svg>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2h12v12H2V2zM1 1h14v14H1V1z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 4H4v8h3V4zm2 0h3v8H9V4z"
    ></path>
  </Svg>,
  'display-flex'
);

export const DisplayInlineFlexIcon = AlignHorizontalLeftIcon;

export const DisplayGridIcon = createSvgIcon(
  <Svg>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1h14v14H1V1zm13 1H2v12h12V2z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4h3v3H4V4zm5 0h3v3H9V4zM5 9H4v3h3V9H5zm4 0h3v3H9V9z"
    ></path>
  </Svg>,
  'display-grid'
);

export const DisplayInlineBlockIcon = createSvgIcon(
  <Svg>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4h8v8H4V4zm6 2H6v4h4V6z"
    ></path>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 2h1v12H1V2zm14 0h-1v12h1V2z"
    ></path>
  </Svg>,
  'display-inline-block'
);

export const DisplayInlineIcon = createSvgIcon(
  <Svg>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 2h1v12H1V2zm14 0h-1v12h1V2z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 3 3.5 13h2l1-3h3l1 3h2L8.75 3h-1.5zm1.917 6L8 5.5 6.833 9h2.334z"
    ></path>
  </Svg>,
  'display-inline'
);

export const DisplayNoneIcon = createSvgIcon(
  <Svg>
    <path
      opacity=".6"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.842 3.33A5.537 5.537 0 0 0 8 3C4.134 3 1 7.5 1 8c0 .23.666 1.311 1.763 2.409l2.242-2.242a3 3 0 0 1 3.162-3.162l1.675-1.676zm-2.009 7.665a3 3 0 0 0 3.162-3.162l2.242-2.242C14.334 6.69 15 7.77 15 8c0 .5-3.134 5-7 5a5.538 5.538 0 0 1-1.842-.33l1.675-1.675z"
    ></path>
    <path d="M2 14 14 2" stroke="currentColor" strokeWidth="1.5"></path>
  </Svg>,
  'display-none'
);

export const OverflowHiddenIcon = DisplayNoneIcon;
