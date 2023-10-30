import { FileMap } from "root/main/api/project";

export const genUid = (function () {
  const soup =
    '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return (length = 20) => {
    const soupLength = soup.length;
    const id = [];
    for (let i = 0; i < length; i++) {
      id[i] = soup.charAt(Math.random() * soupLength);
    }
    return id.join('');
  };
})();

export const throttle = (fn: (...params: any[]) => void, delay = 100) => {
  let timer: NodeJS.Timeout | null = null;
  return (...params: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...params);
        timer = null;
      }, delay);
    }
  };
};

export const deepMerge = (
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> => {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (
          Object.prototype.hasOwnProperty.call(target, key) &&
          typeof target[key] === 'object' &&
          target[key] !== null
        ) {
          // 递归深度合并
          target[key] = deepMerge(target[key], source[key]);
        } else {
          // 如果目标对象没有该属性，直接复制
          target[key] = source[key];
        }
      } else {
        // 如果不是对象，直接复制
        target[key] = source[key];
      }
    }
  }
  return target;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isValidCssValue = (val: string | number) => {
  return /\d+(px|%)*$/.test(val.toString());
};

export const extractCssValue = (val: string | number) => {
  val = val.toString();
  if (val.endsWith('px') || val.endsWith('%')) {
    return { value: parseFloat(val), unit: val.replace(/-?\d+(\.\d+)?/g, '') };
  }
  return { value: parseFloat(val), unit: 'px' };
};


export const getFiles = (currentFolderId: string, fileMap: FileMap) => {
  const currentFolder = fileMap[currentFolderId];
  const files =
    currentFolder && currentFolder.childrenIds
      ? currentFolder.childrenIds.map(
          (fileId: string) => fileMap[fileId] ?? null
        )
      : [];

  return files;
};

export const getFolderChain = (currentFolderId: string, fileMap: FileMap) => {
  const currentFolder = fileMap[currentFolderId];
  const folderChain = [currentFolder];

  if (currentFolder) {
    let parentId: any = currentFolder.parentId;
    while (parentId) {
      const parentFile = fileMap[parentId];
      if (parentFile) {
        folderChain.unshift(parentFile);
        parentId = parentFile.parentId;
      } else {
        parentId = null;
      }
    }
  }

  return folderChain;
};