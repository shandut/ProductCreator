'use strict';

var React = require('react');
var useIsAfterInitialMount = require('../../utilities/use-is-after-initial-mount.js');

function AfterInitialMount({
  children,
  onMount,
  fallback = null
}) {
  const isMounted = useIsAfterInitialMount.useIsAfterInitialMount();
  const content = isMounted ? children : fallback;
  React.useEffect(() => {
    if (isMounted && onMount) {
      onMount();
    }
  }, [isMounted, onMount]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, content);
}

exports.AfterInitialMount = AfterInitialMount;
