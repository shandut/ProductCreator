'use strict';

var React = require('react');
var debounce = require('../../utilities/debounce.js');
var breakpoints = require('../../utilities/breakpoints.js');
var context = require('../../utilities/media-query/context.js');
var EventListener = require('../EventListener/EventListener.js');

const MediaQueryProvider = function MediaQueryProvider({
  children
}) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = React.useCallback(debounce.debounce(() => {
    if (isNavigationCollapsed !== breakpoints.navigationBarCollapsed().matches) {
      setIsNavigationCollapsed(!isNavigationCollapsed);
    }
  }, 40, {
    trailing: true,
    leading: true,
    maxWait: 40
  }), [isNavigationCollapsed]);
  React.useEffect(() => {
    setIsNavigationCollapsed(breakpoints.navigationBarCollapsed().matches);
  }, []);
  const context$1 = React.useMemo(() => ({
    isNavigationCollapsed
  }), [isNavigationCollapsed]);
  return /*#__PURE__*/React.createElement(context.MediaQueryContext.Provider, {
    value: context$1
  }, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "resize",
    handler: handleResize
  }), children);
};

exports.MediaQueryProvider = MediaQueryProvider;
