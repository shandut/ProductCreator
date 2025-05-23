'use strict';

var React = require('react');

function useOnValueChange(value, onChange) {
  const tracked = React.useRef(value);
  React.useEffect(() => {
    const oldValue = tracked.current;
    if (value !== tracked.current) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [value, onChange]);
}

exports.useOnValueChange = useOnValueChange;
