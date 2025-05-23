'use strict';

var React = require('react');
var useEventListener = require('./use-event-listener.js');

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const handleTouchStart = React.useCallback(() => setIsTouchDevice(true), []);
  useEventListener.useEventListener('touchstart', handleTouchStart);
  return isTouchDevice;
}

exports.useIsTouchDevice = useIsTouchDevice;
