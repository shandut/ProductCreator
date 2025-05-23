'use strict';

var React = require('react');
var context = require('./context.js');

function usePortalsManager() {
  const portalsManager = React.useContext(context.PortalsManagerContext);
  if (!portalsManager) {
    throw new Error('No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return portalsManager;
}

exports.usePortalsManager = usePortalsManager;
