import React, { useRef, useState, useEffect } from 'react';
import { Key } from '../../types.js';
import { focusFirstFocusableNode, findFirstKeyboardFocusableNode, findLastKeyboardFocusableNode, focusFirstKeyboardFocusableNode, focusLastKeyboardFocusableNode } from '../../utilities/focus.js';
import { portal } from '../shared.js';
import { useFocusManager } from '../../utilities/focus-manager/hooks.js';
import { Focus } from '../Focus/Focus.js';
import { EventListener } from '../EventListener/EventListener.js';
import { KeypressListener } from '../KeypressListener/KeypressListener.js';

function TrapFocus({
  trapping = true,
  children
}) {
  const {
    canSafelyFocus
  } = useFocusManager({
    trapping
  });
  const focusTrapWrapper = useRef(null);
  const [disableFocus, setDisableFocus] = useState(true);
  useEffect(() => {
    const disable = canSafelyFocus && !(focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement)) ? !trapping : true;
    setDisableFocus(disable);
  }, [canSafelyFocus, trapping]);
  const handleFocusIn = event => {
    const containerContentsHaveFocus = focusTrapWrapper.current && focusTrapWrapper.current.contains(document.activeElement);
    if (trapping === false || !focusTrapWrapper.current || containerContentsHaveFocus || event.target instanceof Element && event.target.matches(`${portal.selector} *`)) {
      return;
    }
    if (canSafelyFocus && event.target instanceof HTMLElement && focusTrapWrapper.current !== event.target && !focusTrapWrapper.current.contains(event.target)) {
      focusFirstFocusableNode(focusTrapWrapper.current);
    }
  };
  const handleTab = event => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }
    const firstFocusableNode = findFirstKeyboardFocusableNode(focusTrapWrapper.current);
    const lastFocusableNode = findLastKeyboardFocusableNode(focusTrapWrapper.current);
    if (event.target === lastFocusableNode && !event.shiftKey) {
      event.preventDefault();
      focusFirstKeyboardFocusableNode(focusTrapWrapper.current);
    }
    if (event.target === firstFocusableNode && event.shiftKey) {
      event.preventDefault();
      focusLastKeyboardFocusableNode(focusTrapWrapper.current);
    }
  };
  return /*#__PURE__*/React.createElement(Focus, {
    disabled: disableFocus,
    root: focusTrapWrapper.current
  }, /*#__PURE__*/React.createElement("div", {
    ref: focusTrapWrapper
  }, /*#__PURE__*/React.createElement(EventListener, {
    event: "focusin",
    handler: handleFocusIn
  }), /*#__PURE__*/React.createElement(KeypressListener, {
    keyCode: Key.Tab,
    keyEvent: "keydown",
    handler: handleTab
  }), children));
}

export { TrapFocus };
