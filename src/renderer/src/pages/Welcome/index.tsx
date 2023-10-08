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
  useTheme,
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SvgWelcomeIllustration from '@/assets/welcome_illustration.svg';
import { useAsyncEffect, useSafeState } from 'ahooks';
import { getRecentlyProjects } from '../../api';
import { IApplicationConfig, IProjectItem } from 'root/main/applicationData';
import modalStore from '@/store/modal';
import showMessage from '../../components/Message';
import { useNavigate } from 'react-router-dom';

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

const ScRecentlyList = styled(List)({
  height: '400px',
  padding: 0,
});

const ScRecentlyListItem = styled(ListItem)({
  paddingLeft: 0,
  paddingRight: 0,
  cursor: 'pointer',
});

export default function Welcome() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [recentlyProjects, setRecentlyProjects] = useSafeState<
    IApplicationConfig['recentlyProjects']
  >([]);

  const handleOpenRecently = async (project: IProjectItem) => {
    const exist = await fs.access(project.projectPath);
    if (!exist) {
      showMessage({ content: '该项目路径不存在', type: 'error' });
    } else {
      navigate(
        `/editor?projectName=${project.projectName}&projectPath=${project.projectPath}`
      );
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
            <Stack sx={{ width: '100px' }}>
              <Button startIcon={<FolderOpenIcon />}>打开项目</Button>
              <Button
                startIcon={<CreateNewFolderIcon />}
                onClick={() => modalStore.toggleCreateProjectModal(true)}
              >
                新建项目
              </Button>
            </Stack>
          </ScMarginBox>
          <ScMarginBox>
            <Typography variant="subtitle2">最近打开</Typography>
            <ScRecentlyList>
              {recentlyProjects.map((project) => (
                <ScRecentlyListItem key={project.projectName} sx={{}}>
                  <ListItemText
                    sx={{ color: theme.palette.primary.light }}
                    onClick={() => handleOpenRecently(project)}
                  >
                    {project.projectName}
                  </ListItemText>
                  <ListItemText>{project.projectPath}</ListItemText>
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
