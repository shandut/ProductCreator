'use strict';

var React = require('react');
var useEventListener = require('./use-event-listener.js');

function useFocus(
/**
 * The target element for the focus event.
 */
ref) {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);
  useEventListener.useEventListener('focus', handleFocus, ref);
  useEventListener.useEventListener('blur', handleBlur, ref);
  return isFocused;
}
function useFocusIn(
/**
 * The target element for the focusin event.
 */
ref) {
  const [isFocusedIn, setIsFocusedIn] = React.useState(false);
  const deferredFocusOut = React.useRef(null);
  const handleFocusIn = React.useCallback(() => {
    if (deferredFocusOut.current) {
      clearTimeout(deferredFocusOut.current);
      deferredFocusOut.current = null;
    }
    setIsFocusedIn(true);
  }, []);
  const handleFocusOut = React.useCallback(() => {
    // Push focusout state update to the end of the event queue to
    // allow subsequent focusin events to persist the isFocusedIn state
    deferredFocusOut.current = setTimeout(() => {
      setIsFocusedIn(false);
    }, 0);
  }, []);
  useEventListener.useEventListener('focusin', handleFocusIn, ref);
  useEventListener.useEventListener('focusout', handleFocusOut, ref);
  React.useEffect(() => () => {
    if (deferredFocusOut.current) clearTimeout(deferredFocusOut.current);
  }, []);
  return isFocusedIn;
}

exports.useFocus = useFocus;
exports.useFocusIn = useFocusIn;
