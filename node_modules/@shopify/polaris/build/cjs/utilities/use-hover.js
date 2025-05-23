'use strict';

var React = require('react');
var useEventListener = require('./use-event-listener.js');

function useHover(
/**
 * The target element for the mouseenter event.
 */
ref) {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);
  useEventListener.useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener.useEventListener('mouseleave', handleMouseLeave, ref);
  return isHovered;
}

exports.useHover = useHover;
