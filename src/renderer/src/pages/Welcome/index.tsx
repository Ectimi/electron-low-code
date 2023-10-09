import {
  Button,
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  Stack,
  styled,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SvgWelcomeIllustration from '@/assets/welcome_illustration.svg';
import { useAsyncEffect, useSafeState } from 'ahooks';
import { checkProjectWindowOpen, getRecentlyProjects } from '../../api';
import {
  IApplicationConfig,
  IProjectItem,
} from 'root/main/template/applicationConfigTemplate';
import modalStore from '@/store/modal';
import showMessage from '@/components/Message';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext, { IAppContext } from '@/context';

const { fs } = window.electronApi;

const ScWelcomePage = styled('div')({
  padding: '50px',
  userSelect: 'none',
});

const ScIllustration = styled('img')({
  display: 'block',
  width: '100%',
  objectFit: 'contain',
});

const ScMarginBox = styled(Box)({
  marginTop: '20px',
});

const ScStack = styled(Stack)({
  width: '100px',
});

const ScRecentlyList = styled(List)({
  height: '400px',
  padding: '0 10px',
  overflowY: 'auto',
  overflowX: 'hidden',
});

const ScRecentlyListItem = styled(ListItem)({
  paddingLeft: 0,
  paddingRight: 0,
  cursor: 'pointer',
});

const ScRecentlyListItemName = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.light,
  flex: '0 0 auto',
  marginRight: '20px',
}));

const ScRecentlyListItemPath = styled(ListItemText)({
  span: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export default function Welcome() {
  const context = useContext(AppContext) as IAppContext;
  const navigate = useNavigate();
  const [recentlyProjects, setRecentlyProjects] = useSafeState<
    IApplicationConfig['recentlyProjects']
  >([]);

  const handleOpenRecently = async (project: IProjectItem) => {
    const exist = await fs.access(project.projectPath);

    if (!exist) {
      showMessage({ content: '该项目路径不存在', type: 'error' });
    } else {
      const isProjectOpen = await checkProjectWindowOpen(project);
      if (!isProjectOpen) {
        navigate(
          `/editor?projectName=${project.projectName}&projectPath=${project.projectPath}`
        );
      }
    }
  };

  useAsyncEffect(async () => {
    const projects = await getRecentlyProjects();
    setRecentlyProjects(projects);
  }, []);

  return (
    <ScWelcomePage>
      <Typography variant="h4">Low Code Editor</Typography>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ScMarginBox>
            <Typography variant="subtitle2">启动</Typography>
            <ScStack>
              <Button
                startIcon={<FolderOpenIcon />}
                onClick={() => context.handleOpenProject()}
              >
                打开项目
              </Button>
              <Button
                startIcon={<CreateNewFolderIcon />}
                onClick={() => modalStore.toggleCreateProjectModal(true)}
              >
                新建项目
              </Button>
            </ScStack>
          </ScMarginBox>
          <ScMarginBox>
            <Typography variant="subtitle2">最近打开</Typography>
            <ScRecentlyList>
              {recentlyProjects.map((project, index) => (
                <ScRecentlyListItem
                  key={project.projectName + '_' + index}
                  onClick={() => handleOpenRecently(project)}
                >
                  <ScRecentlyListItemName>
                    {project.projectName}
                  </ScRecentlyListItemName>
                  <Tooltip title={project.projectPath} placement="bottom">
                    <ScRecentlyListItemPath>
                      {project.projectPath}
                    </ScRecentlyListItemPath>
                  </Tooltip>
                </ScRecentlyListItem>
              ))}
            </ScRecentlyList>
          </ScMarginBox>
        </Grid>
        <Grid xs={8}>
          <ScIllustration src={SvgWelcomeIllustration} />
        </Grid>
      </Grid>
    </ScWelcomePage>
  );
}
