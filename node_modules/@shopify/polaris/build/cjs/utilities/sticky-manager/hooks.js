'use strict';

var React = require('react');
var errors = require('../errors.js');
var context = require('./context.js');

function useStickyManager() {
  const stickyManager = React.useContext(context.StickyManagerContext);
  if (!stickyManager) {
    throw new errors.MissingAppProviderError('No StickyManager was provided.');
  }
  return stickyManager;
}

exports.useStickyManager = useStickyManager;
