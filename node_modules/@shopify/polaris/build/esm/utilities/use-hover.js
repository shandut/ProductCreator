import { useState, useCallback } from 'react';
import { useEventListener } from './use-event-listener.js';

function useHover(
/**
 * The target element for the mouseenter event.
 */
ref) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);
  return isHovered;
}

export { useHover };
