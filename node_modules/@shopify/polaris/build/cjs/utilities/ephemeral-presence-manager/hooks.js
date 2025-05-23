'use strict';

var React = require('react');
var context = require('./context.js');

function useEphemeralPresenceManager() {
  const ephemeralPresenceManager = React.useContext(context.EphemeralPresenceManagerContext);
  if (!ephemeralPresenceManager) {
    throw new Error('No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.');
  }
  return ephemeralPresenceManager;
}
function useReadOnlyEphemeralPresenceManager() {
  const {
    presenceList,
    presenceCounter
  } = useEphemeralPresenceManager();
  return {
    presenceList,
    presenceCounter
  };
}

exports.useEphemeralPresenceManager = useEphemeralPresenceManager;
exports.useReadOnlyEphemeralPresenceManager = useReadOnlyEphemeralPresenceManager;
