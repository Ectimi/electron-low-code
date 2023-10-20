import { PropsWithChildren } from 'react';
import { Header } from '../Header';
import { CreateProjectModal } from '../modal/CreateProjectModal';
import { ResourceLibraryModal } from '../modal/ResourceLibraryModal';

export default function AppLayout(props: PropsWithChildren<any>) {
  return (
    <>
      <Header />
      {props.children}

      <CreateProjectModal />
      <ResourceLibraryModal />
    </>
  );
}
