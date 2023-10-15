import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { SwitchTransition } from 'react-transition-group';
import CSSTransition from '@/components/CSSTransition';
import { RouteItem } from '@/routes';
import { useAsyncEffect } from 'ahooks';
import {
  getWindowNumbers,
  getRecentlyProjects,
  getApplicationConfig,
} from '../../api';
import './index.less';

type Props = {
  routes: RouteItem[];
};

const { fs } = window.electronApi;

export default function AppRoutes(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    props.routes.find((route) => route.path === location.pathname) ?? {};

  useAsyncEffect(async () => {
    const windowNumbers = await getWindowNumbers();
  
    if (windowNumbers <= 1) {
      const lastClosePath = await getApplicationConfig('lastClosePath');
      
      if (!lastClosePath || lastClosePath === '/welcome') {
        navigate('/welcome');
      } else {
        const recentlyProjects = await getRecentlyProjects();
        console.log('rec',recentlyProjects);
        

        const isToWelcome =
          recentlyProjects.length === 0 ||
          (recentlyProjects.length > 0 && windowNumbers > 1);

        if (isToWelcome) {
          navigate('/welcome');
        } else {
          const project = recentlyProjects[0];
          const exist = await fs.access(project.projectPath);
         
          if (!exist) {
            navigate('/welcome');
          } else {
            navigate(
              `/editor?projectName=${project.projectName}&projectPath=${project.projectPath}`
            );
          }
        }
      }
    }else{
      navigate('/welcome');
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
