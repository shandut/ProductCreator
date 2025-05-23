'use strict';

var React = require('react');
var types = require('../../types.js');
var focus = require('../../utilities/focus.js');
var shared = require('../shared.js');
var hooks = require('../../utilities/focus-manager/hooks.js');
var Focus = require('../Focus/Focus.js');
var EventListener = require('../EventListener/EventListener.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');

function TrapFocus({
  trapping = true,
  children
}) {
  const {
    canSafelyFocus
  } = hooks.useFocusManager({
    trapping
  });
  const focusTrapWrapper = React.useRef(null);
  const [disableFocus, setDisableFocus] = React.useState(true);
  React.useEffect(() => {
    const disable = canSafelyFocus && !(focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement)) ? !trapping : true;
    setDisableFocus(disable);
  }, [canSafelyFocus, trapping]);
  const handleFocusIn = event => {
    const containerContentsHaveFocus = focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement);
    if (trapping === false || !focusTrapWrapper.current || containerContentsHaveFocus || event.target instanceof Element && event.target.matches(`${shared.portal.selector} *`)) {
      return;
    }
    if (canSafelyFocus && event.target instanceof HTMLElement && focusTrapWrapper.current !== event.target && !focusTrapWrapper.current.contains(event.target)) {
      focus.focusFirstFocusableNode(focusTrapWrapper.current);
    }
  };
  const handleTab = event => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }
    const firstFocusableNode = focus.findFirstKeyboardFocusableNode(focusTrapWrapper.current);
    const lastFocusableNode = focus.findLastKeyboardFocusableNode(focusTrapWrapper.current);
    if (event.target === lastFocusableNode && !event.shiftKey) {
      event.preventDefault();
      focus.focusFirstKeyboardFocusableNode(focusTrapWrapper.current);
    }
    if (event.target === firstFocusableNode && event.shiftKey) {
      event.preventDefault();
      focus.focusLastKeyboardFocusableNode(focusTrapWrapper.current);
    }
  };
  return /*#__PURE__*/React.createElement(Focus.Focus, {
    disabled: disableFocus,
    root: focusTrapWrapper.current
  }, /*#__PURE__*/React.createElement("div", {
    ref: focusTrapWrapper
  }, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "focusin",
    handler: handleFocusIn
  }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyCode: types.Key.Tab,
    keyEvent: "keydown",
    handler: handleTab
  }), children));
}

exports.TrapFocus = TrapFocus;
