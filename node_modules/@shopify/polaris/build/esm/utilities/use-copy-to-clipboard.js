import { useState, useCallback, useEffect } from 'react';

/**
 * Copy text to the native clipboard using the `navigator.clipboard` API
 * Adapted from https://www.benmvp.com/blog/copy-to-clipboard-react-custom-hook
 */
function useCopyToClipboard(options = {}) {
  const {
    defaultValue = '',
    timeout = 1500
  } = options;
  const [status, setStatus] = useState('inactive');
  const copy = useCallback(value => {
    navigator.clipboard.writeText(typeof value === 'string' ? value : defaultValue).then(() => setStatus('copied'), () => setStatus('failed')).catch(error => {
      throw error;
    });
  }, [defaultValue]);
  useEffect(() => {
    if (status === 'inactive') return;
    const timeoutId = setTimeout(() => setStatus('inactive'), timeout);
    return () => clearTimeout(timeoutId);
  }, [status, timeout]);
  return [copy, status];
}

export { useCopyToClipboard };
