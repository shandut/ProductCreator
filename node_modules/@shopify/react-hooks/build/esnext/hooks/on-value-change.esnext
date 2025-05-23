import React, { useEffect } from 'react';

function useOnValueChange(value, onChange) {
  const tracked = React.useRef(value);
  useEffect(() => {
    const oldValue = tracked.current;
    if (value !== tracked.current) {
      tracked.current = value;
      onChange(value, oldValue);
    }
  }, [value, onChange]);
}

export { useOnValueChange };
