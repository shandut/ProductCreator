'use strict';

var React = require('react');
var errors = require('../errors.js');
var context = require('./context.js');

function useScrollLockManager() {
  const scrollLockManager = React.useContext(context.ScrollLockManagerContext);
  if (!scrollLockManager) {
    throw new errors.MissingAppProviderError('No ScrollLockManager was provided.');
  }
  return scrollLockManager;
}

exports.useScrollLockManager = useScrollLockManager;
