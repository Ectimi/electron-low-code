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

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
