'use strict';

var React = require('react');

/**
 * Returns the previous value of a variable.
 */
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

exports.usePrevious = usePrevious;
