import { PropsWithChildren } from 'react';
import { Header } from '../Header';

export default function AppLayout(props: PropsWithChildren<any>) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}
