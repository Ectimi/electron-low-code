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
  min: 0,
  max: 1500,
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

const ScaleplateContaier = styled('div')((props: ScaleplateContainerProps) => {
  const length = props.max! - props.min!;
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
    width: `${props.dir === 'row' ? props.tickWidth : props.tickLength}px`,
    height: `${props.dir === 'row' ? props.tickLength : props.tickWidth}px`,
    backgroundColor: props.tickColor,
  };
});

const ScaleplateLabel = styled('div')((props: ScaleplateLabelProps) => {
  return {
    position: 'absolute',
    color: props.labelColor,
    fontSize: props.labelFontsize,
    ...props.style,
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
    dir: props.dir,
    tickColor: props.tickColor,
    tickLength: props.tickLength,
    tickWidth: props.tickWidth,
  };

  const slProps: ScaleplateLabelProps = {
    labelColor: props.labelColor,
    labelFontsize: props.labelFontSize,
  };
  const length = props.max! - props.min!;
  const areaNumber = length / props.gap!;
  const perAreaTickAmount = 10;
  const tickNubers = [props.min!];

  for (let i = 1, len = areaNumber * perAreaTickAmount; i <= len; i++) {
    tickNubers.push(props.min! + props.gap!/perAreaTickAmount * i);
  }

  return (
    <ScaleplateContaier
      className={props.className}
      style={props.style}
      {...scProps}
    >
      {tickNubers.map((number, index) => {
        const isMiddle = index !== 0 && index % 10 !== 0 && index % 5 === 0;
        const isEnd = index % 10 === 0;
        const tickLength = isMiddle
          ? props.tickLength! * 2
          : isEnd
          ? props.barWidth
          : props.tickLength;

        return (
          <Fragment key={index}>
            <ScaleplateTick key={index} {...stProps} tickLength={tickLength} />
            {isEnd && index !== tickNubers.length - 1 && (
              <ScaleplateLabel
                {...slProps}
                style={{
                  left: `${
                    props.dir === 'row' ? number  + 3 : 0
                  }px`,
                  top: `${
                    props.dir === 'row' ? 0 : number  + 3
                  }px`,
                  writingMode:
                    props.dir === 'row' ? 'horizontal-tb' : 'vertical-lr',
                  transform: `rotateZ(${props.dir === 'row' ? 0 : 180}deg)`,
                }}
              >
                {number}
              </ScaleplateLabel>
            )}
          </Fragment>
        );
      })}
    </ScaleplateContaier>
  );
}
