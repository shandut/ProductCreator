'use strict';

var React = require('react');
require('./ScrollLock.css.js');
var hooks = require('../../utilities/scroll-lock-manager/hooks.js');

// Even though this has no args, reference ScrollLockProps so the prop explorer
// in the styleguide works without warnings about unfound props
function ScrollLock(_) {
  const scrollLockManager = hooks.useScrollLockManager();
  React.useEffect(() => {
    scrollLockManager.registerScrollLock();
    return () => {
      scrollLockManager.unregisterScrollLock();
    };
  }, [scrollLockManager]);
  return null;
}

exports.ScrollLock = ScrollLock;
