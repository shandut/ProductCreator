import { useRef, useEffect } from 'react';

/**
 * Returns the previous value of a variable.
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export { usePrevious };
