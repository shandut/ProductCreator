'use strict';

var React = require('react');
var types = require('../../types.js');

function useSetIndexFiltersMode(defaultMode = types.IndexFiltersMode.Default) {
  const [mode, setMode] = React.useState(defaultMode);
  return {
    mode,
    setMode
  };
}

exports.useSetIndexFiltersMode = useSetIndexFiltersMode;
