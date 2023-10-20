import { styled } from '@mui/material';
import MenuItem, { IMenuItem } from './MenuItem';

export type TMenuBarProps = {
  template: IMenuItem[];
};

const ScMenuBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '-webkit-app-region': 'no-drag',
});

export default function MenuBar(props: TMenuBarProps) {
  const { template } = props;
  return (
    <ScMenuBox>
      {template.map((mprops) => (
        <MenuItem key={mprops.label} {...mprops} />
      ))}
    </ScMenuBox>
  );
}
