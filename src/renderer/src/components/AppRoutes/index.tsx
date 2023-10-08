import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import CSSTransition from '@/components/CSSTransition';
import { RouteItem } from '@/routes';
import { useAsyncEffect } from 'ahooks';
import { getWindowNumbers, getRecentlyProjects } from '../../api';
import './index.less';

type Props = {
  routes: RouteItem[];
};

export default function AppRoutes(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    props.routes.find((route) => route.path === location.pathname) ?? {};

  useAsyncEffect(async () => {
    const recentlyProjects = await getRecentlyProjects();
    const windowNumbers = await getWindowNumbers();
    const isToWelcome =
      recentlyProjects.length === 0 ||
      (recentlyProjects.length > 0 && windowNumbers > 1);

    if (isToWelcome) {
      navigate('/welcome');
    } else {
      const project = recentlyProjects[0];
      navigate(
        `/editor?projectName=${project.projectName}&projectPath=${project.projectPath}`
      );
    }
  }, []);

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
