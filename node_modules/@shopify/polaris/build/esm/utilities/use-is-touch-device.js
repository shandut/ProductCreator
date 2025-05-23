import { useState, useCallback } from 'react';
import { useEventListener } from './use-event-listener.js';

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const handleTouchStart = useCallback(() => setIsTouchDevice(true), []);
  useEventListener('touchstart', handleTouchStart);
  return isTouchDevice;
}

export { useIsTouchDevice };
