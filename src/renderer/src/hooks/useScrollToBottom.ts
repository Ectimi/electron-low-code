import { useMount, useUnmount } from 'ahooks';
import { RefObject } from 'react';
import { throttle } from '@/utils';

export const useScrollToBottom = (
  nodeRef: RefObject<HTMLElement>,
  callback: any,
  reactionDistance = 20
) => {
  const handleScroll = throttle((e: any) => {
    if (
      e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <=
      reactionDistance
    ) {
      callback();
    }
  });

  useMount(() => {
    nodeRef.current?.addEventListener('scroll', handleScroll);
  });

  useUnmount(() => {
    nodeRef.current?.removeEventListener('scroll', handleScroll);
  });
};
