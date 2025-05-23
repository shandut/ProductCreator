'use strict';

var React = require('react');
var useIsAfterInitialMount = require('../../utilities/use-is-after-initial-mount.js');
var context = require('../../utilities/portals/context.js');
var PortalsContainer = require('./components/PortalsContainer/PortalsContainer.js');

function PortalsManager({
  children,
  container
}) {
  const isMounted = useIsAfterInitialMount.useIsAfterInitialMount();
  const ref = React.useRef(null);
  const contextValue = React.useMemo(() => {
    if (container) {
      return {
        container
      };
    } else if (isMounted) {
      return {
        container: ref.current
      };
    } else {
      return {
        container: null
      };
    }
  }, [container, isMounted]);
  return /*#__PURE__*/React.createElement(context.PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /*#__PURE__*/React.createElement(PortalsContainer.PortalsContainer, {
    ref: ref
  }));
}

exports.PortalsManager = PortalsManager;
