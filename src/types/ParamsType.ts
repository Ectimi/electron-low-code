export interface ICreateProjectParams {
  projectName: string;
  projectPath: string;
  assetFolderName?: string;
}

export interface IEventBeforClose {
  projectName?: string;
  projectPath?: string;
  lastClosePath?: string;
}

export interface IImportResource {
  projectPath: string;
  filePaths: string[];
  targetPath: string;
}
