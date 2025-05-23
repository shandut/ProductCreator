import React, { useRef, useContext, useEffect } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import { classNames, variationName } from '../../../../utilities/css.js';
import { focusFirstFocusableNode } from '../../../../utilities/focus.js';
import { Key } from '../../../../types.js';
import { useTheme } from '../../../../utilities/use-theme.js';
import styles from './Dialog.css.js';
import { FrameContext } from '../../../../utilities/frame/context.js';
import { TrapFocus } from '../../../TrapFocus/TrapFocus.js';
import { Text } from '../../../Text/Text.js';
import { KeypressListener } from '../../../KeypressListener/KeypressListener.js';

function Dialog({
  instant,
  labelledBy,
  children,
  limitHeight,
  size,
  onClose,
  onExited,
  onEntered,
  setClosing,
  hasToasts,
  ...props
}) {
  const theme = useTheme();
  const containerNode = useRef(null);
  const frameContext = useContext(FrameContext);
  let toastMessages;
  if (frameContext) {
    toastMessages = frameContext.toastMessages;
  }
  const classes = classNames(styles.Modal, size && styles[variationName('size', size)], limitHeight && styles.limitHeight);
  const TransitionChild = instant ? Transition : FadeUp;
  useEffect(() => {
    containerNode.current && !containerNode.current.contains(document.activeElement) && focusFirstFocusableNode(containerNode.current);
  }, []);
  const handleKeyDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };
  const handleKeyUp = () => {
    if (setClosing) {
      setClosing(false);
    }
    onClose();
  };
  const ariaLiveAnnouncements = /*#__PURE__*/React.createElement("div", {
    "aria-live": "assertive"
  }, toastMessages ? toastMessages.map(toastMessage => /*#__PURE__*/React.createElement(Text, {
    visuallyHidden: true,
    as: "p",
    key: toastMessage.id
  }, toastMessage.content)) : null);
  return /*#__PURE__*/React.createElement(TransitionChild, Object.assign({}, props, {
    nodeRef: containerNode,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: parseInt(theme.motion['motion-duration-200'], 10),
    onEntered: onEntered,
    onExited: onExited
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.Container,
    "data-polaris-layer": true,
    "data-polaris-overlay": true,
    ref: containerNode
  }, /*#__PURE__*/React.createElement(TrapFocus, null, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": true,
    "aria-label": labelledBy,
    "aria-labelledby": labelledBy,
    tabIndex: -1,
    className: styles.Dialog
  }, /*#__PURE__*/React.createElement("div", {
    className: classes
  }, /*#__PURE__*/React.createElement(KeypressListener, {
    keyCode: Key.Escape,
    keyEvent: "keydown",
    handler: handleKeyDown
  }), /*#__PURE__*/React.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: handleKeyUp
  }), children), ariaLiveAnnouncements))));
}
const fadeUpClasses = {
  appear: classNames(styles.animateFadeUp, styles.entering),
  appearActive: classNames(styles.animateFadeUp, styles.entered),
  enter: classNames(styles.animateFadeUp, styles.entering),
  enterActive: classNames(styles.animateFadeUp, styles.entered),
  exit: classNames(styles.animateFadeUp, styles.exiting),
  exitActive: classNames(styles.animateFadeUp, styles.exited)
};
function FadeUp({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(CSSTransition, Object.assign({}, props, {
    classNames: fadeUpClasses
  }), children);
}

export { Dialog };
