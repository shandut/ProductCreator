import { createContext } from 'react';

// This is internal, but TS throws a build-time error if we don't export it

const FrameContext = /*#__PURE__*/createContext(undefined);

export { FrameContext };
