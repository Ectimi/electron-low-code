import { styled } from "@mui/material";

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

const SvgPositionPatterrn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="172"
    height="64"
    style={{ gridArea: '1 / 1 / -1 / -1' }}
  >
    <g>
      <g>
        <NSPath
          mode="delta"
          fill="currentColor"
          d="m1,1h171l-36,24h-99l-36,-24z"
          data-automation-id="position-top-button"
          aria-label="Position top button"
        ></NSPath>
      </g>
    </g>
    <g>
      <g>
        <WEPath
          mode="delta"
          fill="currentColor"
          d="m171,1v63l-36,-24v-15l36,-24z"
          data-automation-id="position-right-button"
          aria-label="Position right button"
        ></WEPath>
      </g>
    </g>
    <g>
      <g>
        <NSPath
          mode="delta"
          fill="currentColor"
          d="m1,63h171l-36,-24h-99l-36,24z"
          data-automation-id="position-bottom-button"
          aria-label="Position bottom button"
        ></NSPath>
      </g>
    </g>
    <g>
      <g>
        <WEPath
          mode="delta"
          fill="currentColor"
          d="m1,1v63l36,-24v-15l-36,-24z"
          data-automation-id="position-left-button"
          aria-label="Position left button"
        ></WEPath>
      </g>
    </g>
    <clipPath id="position-outer">
      <rect
        x="0"
        y="0"
        width="172"
        height="64"
        fill="transparent"
        rx="2"
        ry="2"
        style={{ pointerEvents: 'none' }}
      ></rect>
    </clipPath>
    <rect
      clipPath="url(#position-outer)"
      x="0"
      y="0"
      width="172"
      height="64"
      fill="transparent"
      rx="2"
      ry="2"
      style={{ pointerEvents: 'none', strokeWidth: '2px' }}
    ></rect>
    <clipPath id="position-inner">
      <rect
        x="36"
        y="24"
        width="100"
        height="16"
        fill="transparent"
        rx="2"
        ry="2"
        style={{ pointerEvents: 'none' }}
      ></rect>
    </clipPath>
    <rect
      clipPath="url(#position-inner)"
      x="36"
      y="24"
      width="100"
      height="16"
      fill="transparent"
      rx="2"
      ry="2"
      style={{ pointerEvents: 'none', strokeWidth: '2px' }}
    ></rect>
  </svg>
);

export default SvgPositionPatterrn;
