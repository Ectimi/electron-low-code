import { styled } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from 'react';

const SpacingWrap = styled('div')({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '36px 4px 36px 1fr 36px 4px 36px',
  gridTemplateRows: '24px 4px 24px 1fr 24px 4px 24px',
  width: '224px',
  height: '120px',
  margin: '0 auto',
  outlineStyle: 'none',
  cursor: 'default',
  userSelect: 'none',
});

const SpacingMaxIcon = styled('div')({
  gridArea: '1 / 1 / -1 / -1',
  display: 'grid',
  gridTemplateColumns: '36px 1fr 36px',
  gridTemplateRows: '24px minmax(16px,1fr) 24px',
  justifyItems: 'center',
  width: '224px',
  height: '120px',
});
const SpacingMinIcon = styled('div')({
  gridArea: '3 / 3 / span 3 / span 3',
  display: 'grid',
  gridTemplateColumns: '36px 1fr 36px',
  gridTemplateRows: '24px minmax(16px,1fr) 24px',
  justifyItems: 'center',
  width: '144px',
  height: '64px',
});

const NSPath = styled('path')({
  color: '#d1d1d1',
  ':hover': {
    color: '#bdbdbd',
  },
});
const WEPath = styled('path')({
  color: '#e5e5e5',
  ':hover': {
    color: '#dfdfdf',
  },
});

const SvgBoxPattern = (props: PropsWithChildren<any>) => {
  const Margins = React.Children.toArray(props.children).filter(
    (c: any) => c.props.name === 'margin'
  );
  const Paddings = React.Children.toArray(props.children).filter(
    (c: any) => c.props.name === 'padding'
  );

  return (
    <SpacingWrap>
      <SpacingMaxIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="224"
          height="120"
          style={{ gridArea: '1 / 1 / -1 / -1' }}
        >
          <g>
            <g>
              <NSPath
                cursor="n-resize"
                mode="delta"
                fill="currentColor"
                d="m1,1 h223 l-36,24 h-151 l-36,-24z"
                data-automation-id="margin-top-button"
                aria-label="Margin top button"
                style={{ cursor: 'n-resize' }}
              ></NSPath>
            </g>
          </g>
          <g>
            <g>
              <WEPath
                cursor="e-resize"
                mode="delta"
                fill="currentColor"
                d="m223,1 v119 l-36,-24 v-71 l36,-24z"
                data-automation-id="margin-right-button"
                aria-label="Margin right button"
                style={{ cursor: 'e-resize' }}
              ></WEPath>
            </g>
          </g>
          <g>
            <g>
              <NSPath
                cursor="s-resize"
                mode="delta"
                fill="currentColor"
                d="m1,119 h223 l-36,-24 h-151 l-36,24z"
                data-automation-id="margin-bottom-button"
                aria-label="Margin bottom button"
                style={{ cursor: 's-resize' }}
              ></NSPath>
            </g>
          </g>
          <g>
            <g>
              <WEPath
                cursor="w-resize"
                mode="delta"
                fill="currentColor"
                d="m1,1 v119 l36,-24 v-71 l-36,-24z"
                data-automation-id="margin-left-button"
                aria-label="Margin left button"
                style={{ cursor: 'w-resize' }}
              ></WEPath>
            </g>
          </g>
          <clipPath id="margin-outer">
            <rect
              x="0"
              y="0"
              width="224"
              height="120"
              fill="transparent"
              rx="2"
              ry="2"
              style={{ pointerEvents: 'none' }}
            ></rect>
          </clipPath>
          <rect
            clipPath="url(#margin-outer)"
            x="0"
            y="0"
            width="224"
            height="120"
            fill="transparent"
            rx="2"
            ry="2"
            style={{
              pointerEvents: 'none',
              strokeWidth: '2px',
              stroke: '#999',
            }}
          ></rect>
          <clipPath id="margin-inner">
            <rect
              x="36"
              y="24"
              width="152"
              height="72"
              fill="transparent"
              rx="2"
              ry="2"
              style={{ pointerEvents: 'none' }}
            ></rect>
          </clipPath>
          <rect
            clipPath="url(#margin-inner)"
            x="36"
            y="24"
            width="152"
            height="72"
            fill="transparent"
            rx="2"
            ry="2"
            style={{
              pointerEvents: 'none',
              strokeWidth: '2px',
              stroke: '#999',
            }}
          ></rect>
        </svg>
        {Margins}
      </SpacingMaxIcon>

      <SpacingMinIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="144"
          height="64"
          style={{ gridArea: '1 / 1 / -1 / -1' }}
        >
          <g>
            <g>
              <NSPath
                cursor="s-resize"
                mode="delta"
                fill="currentColor"
                d="m1,1 h143 l-36,24 h-71 l-36,-24z"
                data-automation-id="padding-top-button"
                aria-label="Padding top button"
                style={{ cursor: 's-resize' }}
              ></NSPath>
            </g>
          </g>
          <g>
            <g>
              <WEPath
                cursor="w-resize"
                mode="delta"
                fill="currentColor"
                d="m143,1 v63 l-36,-24 v-15 l36,-24z"
                data-automation-id="padding-right-button"
                aria-label="Padding right button"
                style={{ cursor: 'w-resize' }}
              ></WEPath>
            </g>
          </g>
          <g>
            <g>
              <NSPath
                cursor="n-resize"
                mode="delta"
                fill="currentColor"
                d="m1,63 h143 l-36,-24 h-71 l-36,24z"
                data-automation-id="padding-bottom-button"
                aria-label="Padding bottom button"
                style={{ cursor: 'n-resize' }}
              ></NSPath>
            </g>
          </g>
          <g>
            <g>
              <WEPath
                cursor="e-resize"
                mode="delta"
                fill="currentColor"
                d="m1,1 v63 l36,-24 v-15 l-36,-24z"
                data-automation-id="padding-left-button"
                aria-label="Padding left button"
                style={{ cursor: 'e-resize' }}
              ></WEPath>
            </g>
          </g>
          <clipPath id="padding-outer">
            <rect
              x="0"
              y="0"
              width="144"
              height="64"
              fill="transparent"
              rx="2"
              ry="2"
              style={{ pointerEvents: 'none' }}
            ></rect>
          </clipPath>
          <rect
            clipPath="url(#padding-outer)"
            x="0"
            y="0"
            width="144"
            height="64"
            fill="transparent"
            rx="2"
            ry="2"
            style={{
              pointerEvents: 'none',
              strokeWidth: '2px',
              stroke: '#999',
            }}
          ></rect>
          <clipPath id="padding-inner">
            <rect
              x="36"
              y="24"
              width="72"
              height="16"
              fill="transparent"
              rx="2"
              ry="2"
              style={{ pointerEvents: 'none' }}
            ></rect>
          </clipPath>
          <rect
            clipPath="url(#padding-inner)"
            x="36"
            y="24"
            width="72"
            height="16"
            fill="transparent"
            rx="2"
            ry="2"
            style={{
              pointerEvents: 'none',
              strokeWidth: '2px',
              stroke: '#999',
            }}
          ></rect>
        </svg>
        {Paddings}
      </SpacingMinIcon>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ gridArea: '3 / 3 / span 3 / span 3', pointerEvents: 'none' }}
      >
        <text
          x="6"
          y="4"
          fill="#a6a6a6"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="8"
          dominantBaseline="hanging"
        >
          {' '}
          padding{' '}
        </text>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ gridArea: '1 / 1 / -1 / -1', pointerEvents: 'none' }}
      >
        <text
          x="6"
          y="4"
          fill="#a6a6a6"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="8"
          dominantBaseline="hanging"
        >
          {' '}
          margin{' '}
        </text>
      </svg>
    </SpacingWrap>
  );
};

export default SvgBoxPattern;
