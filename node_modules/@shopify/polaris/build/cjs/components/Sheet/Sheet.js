'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var focus = require('../../utilities/focus.js');
var css = require('../../utilities/css.js');
var types = require('../../types.js');
var shared = require('../shared.js');
var useTheme = require('../../utilities/use-theme.js');
var Sheet_module = require('./Sheet.css.js');
var hooks = require('../../utilities/media-query/hooks.js');
var Portal = require('../Portal/Portal.js');
var TrapFocus = require('../TrapFocus/TrapFocus.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var Backdrop = require('../Backdrop/Backdrop.js');

const BOTTOM_CLASS_NAMES = {
  enter: css.classNames(Sheet_module.default.Bottom, Sheet_module.default.enterBottom),
  enterActive: css.classNames(Sheet_module.default.Bottom, Sheet_module.default.enterBottomActive),
  exit: css.classNames(Sheet_module.default.Bottom, Sheet_module.default.exitBottom),
  exitActive: css.classNames(Sheet_module.default.Bottom, Sheet_module.default.exitBottomActive)
};
const RIGHT_CLASS_NAMES = {
  enter: css.classNames(Sheet_module.default.Right, Sheet_module.default.enterRight),
  enterActive: css.classNames(Sheet_module.default.Right, Sheet_module.default.enterRightActive),
  exit: css.classNames(Sheet_module.default.Right, Sheet_module.default.exitRight),
  exitActive: css.classNames(Sheet_module.default.Right, Sheet_module.default.exitRightActive)
};
/** @deprecated Use Modal instead or avoid modal patterns all together. */
function Sheet({
  children,
  open,
  onClose,
  onEntered,
  onExit,
  accessibilityLabel,
  activator
}) {
  const theme = useTheme.useTheme();
  const {
    isNavigationCollapsed
  } = hooks.useMediaQuery();
  const container = React.useRef(null);
  const activatorRef = React.useRef(null);
  const handleClose = React.useCallback(() => {
    onClose();
    const activatorElement = activator && isRef(activator) ? activator && activator.current : activatorRef.current;
    if (activatorElement) {
      requestAnimationFrame(() => focus.focusFirstFocusableNode(activatorElement));
    }
  }, [activator, onClose]);
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Deprecation: <Sheet /> is deprecated. This component might be removed in a future major version of Polaris. Use <Modal /> instead or avoid modal patterns all together.');
    }
  }, []);
  const activatorMarkup = activator && !isRef(activator) ? /*#__PURE__*/React.createElement("div", {
    ref: activatorRef
  }, activator) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, activatorMarkup, /*#__PURE__*/React.createElement(Portal.Portal, {
    idPrefix: "sheet"
  }, /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
    nodeRef: container,
    classNames: isNavigationCollapsed ? BOTTOM_CLASS_NAMES : RIGHT_CLASS_NAMES,
    timeout: parseInt(theme.motion['motion-duration-300'], 10),
    in: open,
    mountOnEnter: true,
    unmountOnExit: true,
    onEntered: onEntered,
    onExit: onExit
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: Sheet_module.default.Container
  }, shared.layer.props, shared.overlay.props, {
    ref: container
  }), /*#__PURE__*/React.createElement(TrapFocus.TrapFocus, {
    trapping: open
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": true,
    tabIndex: -1,
    className: Sheet_module.default.Sheet,
    "aria-label": accessibilityLabel
  }, children)))), /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyCode: types.Key.Escape,
    handler: handleClose
  }), open && /*#__PURE__*/React.createElement(Backdrop.Backdrop, {
    transparent: true,
    onClick: handleClose
  })));
}
function isRef(ref) {
  return Object.prototype.hasOwnProperty.call(ref, 'current');
}

exports.Sheet = Sheet;
