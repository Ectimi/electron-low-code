export interface IProjectItem {
  projectName: string;
  projectPath: string;
}

export interface IApplicationConfig {
  theme: 'light' | 'dark';
  lastClosePath:string;
  recentlyProjects: Array<IProjectItem>;
}

export default {
  theme: 'light',
  lastClosePath: '',
  recentlyProjects: [],
} as IApplicationConfig;
