'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../../../utilities/css.js');
var focus = require('../../../../utilities/focus.js');
var types = require('../../../../types.js');
var useTheme = require('../../../../utilities/use-theme.js');
var Dialog_module = require('./Dialog.css.js');
var context = require('../../../../utilities/frame/context.js');
var TrapFocus = require('../../../TrapFocus/TrapFocus.js');
var Text = require('../../../Text/Text.js');
var KeypressListener = require('../../../KeypressListener/KeypressListener.js');

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
  const theme = useTheme.useTheme();
  const containerNode = React.useRef(null);
  const frameContext = React.useContext(context.FrameContext);
  let toastMessages;
  if (frameContext) {
    toastMessages = frameContext.toastMessages;
  }
  const classes = css.classNames(Dialog_module.default.Modal, size && Dialog_module.default[css.variationName('size', size)], limitHeight && Dialog_module.default.limitHeight);
  const TransitionChild = instant ? reactTransitionGroup.Transition : FadeUp;
  React.useEffect(() => {
    containerNode.current && !containerNode.current.contains(document.activeElement) && focus.focusFirstFocusableNode(containerNode.current);
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
  }, toastMessages ? toastMessages.map(toastMessage => /*#__PURE__*/React.createElement(Text.Text, {
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
    className: Dialog_module.default.Container,
    "data-polaris-layer": true,
    "data-polaris-overlay": true,
    ref: containerNode
  }, /*#__PURE__*/React.createElement(TrapFocus.TrapFocus, null, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": true,
    "aria-label": labelledBy,
    "aria-labelledby": labelledBy,
    tabIndex: -1,
    className: Dialog_module.default.Dialog
  }, /*#__PURE__*/React.createElement("div", {
    className: classes
  }, /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyCode: types.Key.Escape,
    keyEvent: "keydown",
    handler: handleKeyDown
  }), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyCode: types.Key.Escape,
    handler: handleKeyUp
  }), children), ariaLiveAnnouncements))));
}
const fadeUpClasses = {
  appear: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.entering),
  appearActive: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.entered),
  enter: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.entering),
  enterActive: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.entered),
  exit: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.exiting),
  exitActive: css.classNames(Dialog_module.default.animateFadeUp, Dialog_module.default.exited)
};
function FadeUp({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, Object.assign({}, props, {
    classNames: fadeUpClasses
  }), children);
}

exports.Dialog = Dialog;
