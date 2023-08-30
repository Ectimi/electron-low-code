import { useRef, Children, cloneElement } from 'react';
import { CSSTransition as _CSSTransition } from 'react-transition-group';

//解决 react-transition-group出现的警告 ”findDOMNode is deprecated in StrictMode"
const CSSTransition = (props: any) => {
  const nodeRef = useRef(null);

  return (
    <_CSSTransition {...props} nodeRef={nodeRef}>
      <>
        {Children.map(props.children, (child) =>
          cloneElement(child, { ref: nodeRef })
        )}
      </>
    </_CSSTransition>
  );
};

export default CSSTransition;
