export interface IProjectConfig {
  projectName: string;
  projectPath: string;
  assetFolderName: string;
  canvas: {
    width: number;
    height: number;
  };
  materialList: Array<any>;
}

export default {
  projectName: '',
  projectPath: '',
  assetFolderName: '',
  canvas: {
    width: 1920,
    height: 1080,
  },
  materialList: [],
} as IProjectConfig;
