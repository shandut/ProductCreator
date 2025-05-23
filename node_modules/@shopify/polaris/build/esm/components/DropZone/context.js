import { createContext } from 'react';
import { defaultAllowMultiple } from './utils/index.js';

const DropZoneContext = /*#__PURE__*/createContext({
  disabled: false,
  focused: false,
  size: 'extraLarge',
  type: 'file',
  measuring: false,
  allowMultiple: defaultAllowMultiple
});

export { DropZoneContext };
