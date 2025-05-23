'use strict';

var React = require('react');

/**
 * Returns a MutatableRefObject containing a boolean value that
 * represents a components mounted status.
 * @returns MutableRefObject<boolean> The mounted status
 */
function useIsMountedRef() {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

exports.useIsMountedRef = useIsMountedRef;
