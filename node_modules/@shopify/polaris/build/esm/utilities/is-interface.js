import { isValidElement } from 'react';

function isInterface(x) {
  return ! /*#__PURE__*/isValidElement(x) && x !== undefined;
}

export { isInterface };
