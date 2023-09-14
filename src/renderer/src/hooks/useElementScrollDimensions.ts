import { useEffect, useState } from 'react';

interface Dimensions {
  scrollWidth: number;
  scrollHeight: number;
}

const useElementScrollDimensions = <T extends HTMLElement>(
  ref: React.RefObject<T>
) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    scrollWidth: 0,
    scrollHeight: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { scrollWidth, scrollHeight } = ref.current;
        
        setDimensions({ scrollWidth, scrollHeight });
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [ref]);

  return dimensions;
};

export default useElementScrollDimensions;
