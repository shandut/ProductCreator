'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var focus = require('../../utilities/focus.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var components = require('../../utilities/components.js');
var Modal_module = require('./Modal.css.js');
var Section = require('./components/Section/Section.js');
var Dialog = require('./components/Dialog/Dialog.js');
var Header = require('./components/Header/Header.js');
var Backdrop = require('../Backdrop/Backdrop.js');
var Footer = require('./components/Footer/Footer.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Box = require('../Box/Box.js');
var Scrollable = require('../Scrollable/Scrollable.js');
var Portal = require('../Portal/Portal.js');
var InlineStack = require('../InlineStack/InlineStack.js');
var Spinner = require('../Spinner/Spinner.js');

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;
const Modal = function Modal({
  children,
  title,
  titleHidden = false,
  src,
  iFrameName,
  open,
  instant,
  sectioned,
  loading,
  size,
  limitHeight,
  footer,
  primaryAction,
  secondaryActions,
  onScrolledToBottom,
  activator,
  activatorWrapper = 'div',
  onClose,
  onIFrameLoad,
  onTransitionEnd,
  noScroll
}) {
  const [iframeHeight, setIframeHeight] = React.useState(IFRAME_LOADING_HEIGHT);
  const [closing, setClosing] = React.useState(false);
  const headerId = React.useId();
  const activatorRef = React.useRef(null);
  const i18n = hooks.useI18n();
  const iframeTitle = i18n.translate('Polaris.Modal.iFrameTitle');
  let dialog;
  let backdrop;
  const handleEntered = React.useCallback(() => {
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }, [onTransitionEnd]);
  const handleExited = React.useCallback(() => {
    setIframeHeight(IFRAME_LOADING_HEIGHT);
    const activatorElement = activator && isRef(activator) ? activator && activator.current : activatorRef.current;
    if (activatorElement) {
      requestAnimationFrame(() => focus.focusFirstFocusableNode(activatorElement));
    }
  }, [activator]);
  const handleIFrameLoad = React.useCallback(evt => {
    const iframe = evt.target;
    if (iframe && iframe.contentWindow) {
      try {
        setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
      } catch (_error) {
        setIframeHeight(DEFAULT_IFRAME_CONTENT_HEIGHT);
      }
    }
    if (onIFrameLoad != null) {
      onIFrameLoad(evt);
    }
  }, [onIFrameLoad]);
  if (open) {
    const footerMarkup = !footer && !primaryAction && !secondaryActions ? null : /*#__PURE__*/React.createElement(Footer.Footer, {
      primaryAction: primaryAction,
      secondaryActions: secondaryActions
    }, footer);
    const content = sectioned ? components.wrapWithComponent(children, Section.Section, {
      titleHidden
    }) : children;
    const body = loading ? /*#__PURE__*/React.createElement(Box.Box, {
      padding: "400"
    }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      gap: "400",
      align: "center",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement(Spinner.Spinner, null))) : content;
    const scrollContainerMarkup = noScroll ? /*#__PURE__*/React.createElement("div", {
      className: Modal_module.default.NoScrollBody
    }, /*#__PURE__*/React.createElement(Box.Box, {
      width: "100%",
      overflowX: "hidden",
      overflowY: "hidden"
    }, body)) : /*#__PURE__*/React.createElement(Scrollable.Scrollable, {
      shadow: true,
      className: Modal_module.default.Body,
      onScrolledToBottom: onScrolledToBottom
    }, body);
    const bodyMarkup = src ? /*#__PURE__*/React.createElement("iframe", {
      name: iFrameName,
      title: iframeTitle,
      src: src,
      className: Modal_module.default.IFrame,
      onLoad: handleIFrameLoad,
      style: {
        height: `${iframeHeight}px`
      }
    }) : scrollContainerMarkup;
    dialog = /*#__PURE__*/React.createElement(Dialog.Dialog, {
      instant: instant,
      labelledBy: headerId,
      onClose: onClose,
      onEntered: handleEntered,
      onExited: handleExited,
      size: size,
      limitHeight: limitHeight,
      setClosing: setClosing
    }, /*#__PURE__*/React.createElement(Header.Header, {
      titleHidden: titleHidden,
      id: headerId,
      closing: closing,
      onClose: onClose
    }, title), bodyMarkup, footerMarkup);
    backdrop = /*#__PURE__*/React.createElement(Backdrop.Backdrop, {
      setClosing: setClosing,
      onClick: onClose
    });
  }
  const animated = !instant;
  const activatorMarkup = activator && !isRef(activator) ? /*#__PURE__*/React.createElement(Box.Box, {
    ref: activatorRef,
    as: activatorWrapper
  }, activator) : null;
  return /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, activatorMarkup, /*#__PURE__*/React.createElement(Portal.Portal, {
    idPrefix: "modal"
  }, /*#__PURE__*/React.createElement(reactTransitionGroup.TransitionGroup, {
    appear: animated,
    enter: animated,
    exit: animated
  }, dialog), backdrop));
};
function isRef(ref) {
  return Object.prototype.hasOwnProperty.call(ref, 'current');
}
Modal.Section = Section.Section;

exports.Modal = Modal;
