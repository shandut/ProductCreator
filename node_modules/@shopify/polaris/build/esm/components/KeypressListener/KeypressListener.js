import { useRef, useCallback, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../../utilities/use-isomorphic-layout-effect.js';

function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup',
  options,
  useCapture,
  document: ownerDocument = globalThis.document
}) {
  const tracked = useRef({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  const handleKeyEvent = useCallback(event => {
    const {
      handler,
      keyCode
    } = tracked.current;
    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);
  useEffect(() => {
    ownerDocument.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      ownerDocument.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
    };
  }, [keyEvent, handleKeyEvent, useCapture, options, ownerDocument]);
  return null;
}

export { KeypressListener };
