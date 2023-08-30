import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import CSSTransition from '@/components/CSSTransition';
import { RouteItem } from '@/routes';
import './index.less'

type Props = {
  routes: RouteItem[];
};

export default function AppRoutes(props: Props) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    props.routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div ref={nodeRef} className="page">
          {currentOutlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
