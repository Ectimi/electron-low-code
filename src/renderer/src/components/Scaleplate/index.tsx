import { CSSProperties, Fragment } from 'react';
import { styled } from '@mui/material';

interface ScaleplateLabelProps {
  labelColor?: string;
  labelFontsize?: number;
  style?: CSSProperties;
}

interface ScaleplateContainerProps {
  dir?: 'column' | 'row';
  min?: number;
  max?: number;
  barWidth?: number;
  background?: string;
}

interface ScaleplateTickProps {
  dir?: 'column' | 'row';
  tickLength?: number;
  tickWidth?: number;
  tickColor?: string;
  style?: CSSProperties;
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
  min: -1000,
  max: 1000,
  gap: 100,
  scale: 1,
  barWidth: 24,
  background: '#ffffff',
  tickLength: 6,
  tickWidth: 1,
  tickColor: '#d1d1d1',
  labelColor: '#9a9a9a',
  labelFontSize: 14,
};

const extendLength = 50;

const ScaleplateContaier = styled('div')((props: ScaleplateContainerProps) => {
  const max = props.max! % 100 === 0 ? props.max! + extendLength : props.max!;
  const length = max! - props.min!;
  return {
    position: 'relative',
    background: props.background,
    flexBasis: `${length}px`,
    flexShrink: 0,
    ...(props.dir === 'row'
      ? { width: `${length}px`, height: `${props.barWidth}px` }
      : { width: `${props.barWidth}px`, height: `${length}px` }),
  };
});

const ScaleplateTick = styled('div')((props: ScaleplateTickProps) => {
  return {
    width: `${props.dir === 'row' ? props.tickWidth : props.tickLength}px`,
    height: `${props.dir === 'row' ? props.tickLength : props.tickWidth}px`,
    backgroundColor: props.tickColor,
    ...props.style,
  };
});

const ScaleplateLabel = styled('div')((props: ScaleplateLabelProps) => {
  return {
    position: 'absolute',
    color: props.labelColor,
    fontSize: props.labelFontsize,
    userSelect:'none',
    ...props.style,
  };
});

export default function Scaleplate(p: ScaleplateProps = {}) {
  const props = { ...defaultProps, ...p };
  const max = props.max! % 100 === 0 ? props.max! + extendLength : props.max!;
  const scProps: ScaleplateContainerProps = {
    dir: props.dir,
    background: props.background,
    barWidth: props.barWidth,
    max,
    min: props.min,
  };
  const stProps: ScaleplateTickProps = {
    dir: props.dir,
    tickColor: props.tickColor,
    tickLength: props.tickLength,
    tickWidth: props.tickWidth,
  };

  const slProps: ScaleplateLabelProps = {
    labelColor: props.labelColor,
    labelFontsize: props.labelFontSize,
  };
  const length = max! - props.min!;
  const areaNumber = length / props.gap!;
  const perAreaTickAmount = 10;
  const tickNumbers = [props.min!];
  const labels: Array<{ value: number; distance: number }> = [];

  for (let i = 1, len = areaNumber * perAreaTickAmount; i <= len; i++) {
    tickNumbers.push(props.min! + (props.gap! / perAreaTickAmount) * i);
  }

  if (props.min! >= 0) {
    tickNumbers.forEach((n) => {
      labels.push({ value: n, distance: n + 3 });
    });
  } else if (props.min! < 0 && props.max! <= 0) {
    tickNumbers.forEach((n, i) => {
      labels.push({
        value: n,
        distance: tickNumbers[tickNumbers.length - 1 - i] * -1 + 3,
      });
    });
  } else if (props.min! < 0 && props.max! > 0) {
    const positives = tickNumbers.filter((item) => item >= 0);
    const negatives = tickNumbers.filter((item) => item < 0);

    negatives.forEach((negativeNumber, ni) => {
      labels.push({
        value: negativeNumber,
        distance: negatives[negatives.length - 1 - ni] * -1 + 3,
      });
    });
    positives.forEach((positiveNumber) => {
      labels.push({
        value: positiveNumber,
        distance: positiveNumber + Math.abs(Math.min(...negatives)) + 3,
      });
    });
  }

  return (
    <ScaleplateContaier
      className={props.className}
      style={props.style}
      {...scProps}
    >
      {tickNumbers.map((_, index) => {
        const isMiddle = index !== 0 && index % 10 !== 0 && index % 5 === 0;
        const isEnd = index % 10 === 0;
        const tickLength = isMiddle
          ? props.tickLength! * 2
          : isEnd
          ? props.barWidth
          : props.tickLength;

        return (
          <Fragment key={index}>
            <ScaleplateTick
              key={index}
              {...stProps}
              tickLength={tickLength}
              style={{
                position: 'absolute',
                ...(props.dir === 'row'
                  ? { bottom: 0, left: index * 10 + 'px' }
                  : { right: 0, top: index * 10 + 'px' }),
              }}
            />
          </Fragment>
        );
      })}
      {labels
        .filter((_, index) => index % 10 === 0)
        .map((item, index) => (
          <ScaleplateLabel
            key={item.value + index}
            {...slProps}
            style={{
              ...(props.dir === 'row'
                ? { left: item.distance + 'px' }
                : { top: item.distance + 'px' }),
              writingMode:
                props.dir === 'row' ? 'horizontal-tb' : 'vertical-lr',
              transform: `rotateZ(${props.dir === 'row' ? 0 : 180}deg)`,
            }}
          >
            {item.value}
          </ScaleplateLabel>
        ))}
    </ScaleplateContaier>
  );
}
