import { CSSProperties } from 'react';
import { styled } from '@mui/material';

interface ScaleplateLabelProps {
  left?: number;
  labelColor?: string;
  labelFontsize?: number;
}

interface ScaleplateContainerProps {
  dir?: 'column' | 'row';
  min?: number;
  max?: number;
  barWidth?: number;
  background?: string;
}

interface ScaleplateTickProps {
  tickLength?: number;
  tickWidth?: number;
  tickColor?: string;
}

interface ScaleplateProps
  extends ScaleplateContainerProps,
    ScaleplateTickProps {
  className?: string;
  style?: CSSProperties;
  gap?: number;
  scale?: number;
  tickGap?: number;
  labelFontSize?: number;
  labelColor?: string;
}

const defaultProps: ScaleplateProps = {
  dir: 'row',
  min: -500,
  max: 500,
  gap: 100,
  scale: 1,
  barWidth: 24,
  background: '#ffffff',
  tickGap: 10,
  tickLength: 6,
  tickWidth: 1,
  tickColor: '#d1d1d1',
  labelColor: '#9a9a9a',
  labelFontSize: 14,
};

const ScaleplateContaier = styled('div')((props: ScaleplateContainerProps) => {
  const length = Math.abs(props.min!) + Math.abs(props.max!);
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: props.dir,
    alignItems: 'flex-end',
    background: props.background,
    justifyContent: 'space-between',
    ...(props.dir === 'row'
      ? { width: `${length}px`, height: `${props.barWidth}px` }
      : { width: `${props.barWidth}px`, height: `${length}px` }),
  };
});

const ScaleplateTick = styled('div')((props: ScaleplateTickProps) => {
  return {
    width: `${props.tickWidth}px`,
    height: `${props.tickLength}px`,
    backgroundColor: props.tickColor,
  };
});

const ScaleplateLabel = styled('div')((props: ScaleplateLabelProps) => {
  return {
    position: 'absolute',
    top: '0px',
    left: `${props.left}px`,
    color: props.labelColor,
    fontSize: props.labelFontsize,
  };
});

export default function Scaleplate(p: ScaleplateProps = {}) {
  const props = { ...defaultProps, ...p };
  const scProps: ScaleplateContainerProps = {
    dir: props.dir,
    background: props.background,
    barWidth: props.barWidth,
    max: props.max,
    min: props.min,
  };
  const stProps: ScaleplateTickProps = {
    tickColor: props.tickColor,
    tickLength: props.tickLength,
    tickWidth: props.tickWidth,
  };
  const slProps: ScaleplateLabelProps = {
    labelColor: props.labelColor,
    labelFontsize: props.labelFontSize,
  };
  const length = Math.abs(props.min!) + Math.abs(props.max!);
  const areaNumber = length / props.gap!;
  const tickNumber = areaNumber * Math.abs(props.gap! / props.tickGap!);

  return (
    <ScaleplateContaier
      className={props.className}
      style={props.style}
      {...scProps}
    >
      {Array.from({ length: tickNumber }).map((_, index) => {
        const isMiddle = index !== 0 && index % 10 !== 0 && index % 5 === 0;
        const isEnd = index % 10 === 0;
        const tickLength = isMiddle
          ? props.tickLength! * 2
          : isEnd
          ? props.barWidth
          : props.tickLength;

        return (
          <>
            <ScaleplateTick key={index} {...stProps} tickLength={tickLength} />
            {isEnd && (
              <ScaleplateLabel
                {...slProps}
                left={props.gap! * index + 3} 
              >
                {index * props.gap!}
              </ScaleplateLabel>
            )}
          </>
        );
      })}
    </ScaleplateContaier>
  );
}
