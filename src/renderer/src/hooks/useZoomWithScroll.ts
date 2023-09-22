import { useLatest, useMount, useSafeState, useUnmount } from 'ahooks';
import { RefObject } from 'react';

const useZoomWithScroll = (
  target: RefObject<HTMLElement> | HTMLElement = document.documentElement
): number => {
  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
  const [currentZoomLevel, setCurrentZoomLevel] = useSafeState(zoomLevels[2]);
  const zoomLevelRef = useLatest(currentZoomLevel)

  const handleScroll = (event: WheelEvent) => {
    if (!event.altKey) return;

    event.preventDefault();
    const delta = Math.sign(event.deltaY);

    let currentIndex = zoomLevels.indexOf(zoomLevelRef.current);
    

    if (delta > 0) {
      currentIndex--;
      currentIndex = currentIndex < 0 ? 0 : currentIndex;
    } else if (delta < 0) {
      currentIndex++;
      currentIndex =
        currentIndex > zoomLevels.length - 1
          ? zoomLevels.length - 1
          : currentIndex;
    }

    setCurrentZoomLevel(zoomLevels[currentIndex]);
  };

  useMount(() => {
    const el = 'current' in target ? target.current : target;

    if (el) {
      (el as HTMLElement).addEventListener('wheel', handleScroll);
    }
  });

  useUnmount(() => {
    const el = 'current' in target ? target.current : target;
    if (el) {
      (el as HTMLElement).removeEventListener('wheel', handleScroll);
    }
  });

  return currentZoomLevel;
};

export default useZoomWithScroll;
