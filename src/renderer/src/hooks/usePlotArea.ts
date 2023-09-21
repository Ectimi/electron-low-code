import { throttle } from '@/utils';
import { useSafeState, useMount, useUnmount } from 'ahooks';
import { LegacyRef, useRef } from 'react';

type TOptions = {
  initialCanvasPos?: { x: number; y: number };
  onPressSpace?: (el: HTMLDivElement) => void;
  onLooseSpace?: (el: HTMLDivElement) => void;
};

let isPressSpace = false;
let isMouseLeave = true;
let isMouseDown = false;
let startX = 0;
let startY = 0;

export function usePlotArea(
  options: TOptions
): [LegacyRef<HTMLDivElement>, TOptions['initialCanvasPos']] {
  const {
    initialCanvasPos = { x: 0, y: 0 },
    onLooseSpace,
    onPressSpace,
  } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [canvasPos, setCanvasPos] = useSafeState(initialCanvasPos);

  const keydownHandle = (e: KeyboardEvent) => {
    if (!ref.current) return;
    if (e.code === 'Space') {
      isPressSpace = true;
      onPressSpace?.(ref.current);
    }
  };

  const keyupHandle = (e: KeyboardEvent) => {
    if (!ref.current) return;
    if (e.code === 'Space') {
      isPressSpace = false;
      onLooseSpace?.(ref.current);
    }
  };

  const mouseleaveHandle = () => (isMouseLeave = true);
  const mouseoverHandle = () => (isMouseLeave = false);

  const mousedownHandle = (e: MouseEvent) => {
    isMouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const mousemoveHandle = throttle((e: MouseEvent) => {
    if (isPressSpace && !isMouseLeave && isMouseDown) {
      // 计算鼠标移动的距离
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setCanvasPos((prevCanvasPos) => ({
        x: prevCanvasPos.x + deltaX,
        y: prevCanvasPos.y + deltaY,
      }));

      startX = e.clientX;
      startY = e.clientY;
    }
  }, 30);

  const mouseupHandle = () => {
    isMouseDown = false;
  };

  useMount(() => {
    document.addEventListener('keydown', keydownHandle);
    document.addEventListener('keyup', keyupHandle);
    document.addEventListener('mouseup', mouseupHandle);

    if (ref.current) {
      ref.current.addEventListener('mouseleave', mouseleaveHandle);
      ref.current.addEventListener('mouseover', mouseoverHandle);
      ref.current.addEventListener('mousedown', mousedownHandle);
      ref.current.addEventListener('mouseup', mouseupHandle);
      ref.current.addEventListener('mousemove', mousemoveHandle);
    }
  });

  useUnmount(() => {
    document.removeEventListener('keydown', keydownHandle);
    document.removeEventListener('keyup', keyupHandle);
    document.removeEventListener('mouseup', mouseupHandle);

    if (ref.current) {
      ref.current.removeEventListener('mouseleave', mouseleaveHandle);
      ref.current.removeEventListener('mouseover', mouseoverHandle);
      ref.current.removeEventListener('mousedown', mousedownHandle);
      ref.current.removeEventListener('mouseup', mouseupHandle);
      ref.current.removeEventListener('mousemove', mousemoveHandle);
    }
  });

  return [ref, canvasPos];
}
