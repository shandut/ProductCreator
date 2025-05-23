'use strict';

var React = require('react');
var context = require('../../utilities/ephemeral-presence-manager/context.js');

const defaultState = {
  tooltip: 0,
  hovercard: 0
};
function EphemeralPresenceManager({
  children
}) {
  const [presenceCounter, setPresenceCounter] = React.useState(defaultState);
  const addPresence = React.useCallback(key => {
    setPresenceCounter(prevList => ({
      ...prevList,
      [key]: prevList[key] + 1
    }));
  }, []);
  const removePresence = React.useCallback(key => {
    setPresenceCounter(prevList => ({
      ...prevList,
      [key]: prevList[key] - 1
    }));
  }, []);
  const value = React.useMemo(() => ({
    presenceList: Object.entries(presenceCounter).reduce((previousValue, currentValue) => {
      const [key, value] = currentValue;
      return {
        ...previousValue,
        [key]: value >= 1
      };
    }, {}),
    presenceCounter,
    addPresence,
    removePresence
  }), [addPresence, removePresence, presenceCounter]);
  return /*#__PURE__*/React.createElement(context.EphemeralPresenceManagerContext.Provider, {
    value: value
  }, children);
}

exports.EphemeralPresenceManager = EphemeralPresenceManager;
