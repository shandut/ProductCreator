'use strict';

var React = require('react');
var useIsomorphicLayoutEffect = require('../../utilities/use-isomorphic-layout-effect.js');

function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup',
  options,
  useCapture,
  document: ownerDocument = globalThis.document
}) {
  const tracked = React.useRef({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  const handleKeyEvent = React.useCallback(event => {
    const {
      handler,
      keyCode
    } = tracked.current;
    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);
  React.useEffect(() => {
    ownerDocument.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      ownerDocument.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
    };
  }, [keyEvent, handleKeyEvent, useCapture, options, ownerDocument]);
  return null;
}

exports.KeypressListener = KeypressListener;
