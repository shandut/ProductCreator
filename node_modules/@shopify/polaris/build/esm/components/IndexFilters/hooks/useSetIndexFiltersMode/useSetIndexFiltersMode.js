import { useState } from 'react';
import { IndexFiltersMode } from '../../types.js';

function useSetIndexFiltersMode(defaultMode = IndexFiltersMode.Default) {
  const [mode, setMode] = useState(defaultMode);
  return {
    mode,
    setMode
  };
}

export { useSetIndexFiltersMode };
