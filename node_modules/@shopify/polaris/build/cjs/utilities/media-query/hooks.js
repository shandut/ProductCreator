'use strict';

var React = require('react');
var context = require('./context.js');

function useMediaQuery() {
  const mediaQuery = React.useContext(context.MediaQueryContext);
  if (!mediaQuery) {
    throw new Error('No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return mediaQuery;
}

exports.useMediaQuery = useMediaQuery;
