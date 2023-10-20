export interface IProjectConfig {
  projectName: string;
  projectPath: string;
  assetFolderName: string;
  imageFolderName: string;
  videoFolderName: string;
  fontFolderName: string;
  canvas: {
    width: number;
    height: number;
  };
  materialList: Array<any>;
}

const defaultProjectConfig: IProjectConfig = {
  projectName: '',
  projectPath: '',
  assetFolderName: 'assets',
  imageFolderName: 'images',
  videoFolderName: 'videos',
  fontFolderName: 'fonts',
  canvas: {
    width: 1920,
    height: 1080,
  },
  materialList: [],
};

export default defaultProjectConfig;
