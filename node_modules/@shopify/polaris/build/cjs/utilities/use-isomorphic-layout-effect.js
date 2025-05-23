'use strict';

var React = require('react');
var target = require('./target.js');

// eslint-disable-next-line no-restricted-imports
const useIsomorphicLayoutEffect = target.isServer ? React.useEffect : React.useLayoutEffect;

exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
