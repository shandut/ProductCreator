'use strict';

var React = require('react');

// This is internal, but TS throws a build-time error if we don't export it

const FrameContext = /*#__PURE__*/React.createContext(undefined);

exports.FrameContext = FrameContext;
