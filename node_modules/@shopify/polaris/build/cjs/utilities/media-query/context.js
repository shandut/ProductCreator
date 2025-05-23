'use strict';

var React = require('react');

// This is internal, but TS throws a build-time error if we don't export it

const MediaQueryContext = /*#__PURE__*/React.createContext(undefined);

exports.MediaQueryContext = MediaQueryContext;
