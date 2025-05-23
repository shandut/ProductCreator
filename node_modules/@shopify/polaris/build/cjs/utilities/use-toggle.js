'use strict';

var React = require('react');

/**
 * Returns a stateful value, and a set of memoized functions to toggle it,
 * set it to true and set it to false
 */
function useToggle(initialState) {
  const [value, setState] = React.useState(initialState);
  return {
    value,
    toggle: React.useCallback(() => setState(state => !state), []),
    setTrue: React.useCallback(() => setState(true), []),
    setFalse: React.useCallback(() => setState(false), [])
  };
}

exports.useToggle = useToggle;
