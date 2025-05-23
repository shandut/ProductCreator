'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var types = require('../../../../types.js');
var Toast_module = require('./Toast.css.js');
var Icon = require('../../../Icon/Icon.js');
var Button = require('../../../Button/Button.js');
var KeypressListener = require('../../../KeypressListener/KeypressListener.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Text = require('../../../Text/Text.js');

const DEFAULT_TOAST_DURATION = 5000;
const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;
function Toast({
  content,
  onDismiss,
  duration,
  error,
  action,
  tone,
  onClick,
  icon,
  isHovered
}) {
  const defaultDurationWithoutAction = duration || DEFAULT_TOAST_DURATION;
  const defaultDuration = action && !duration ? DEFAULT_TOAST_DURATION_WITH_ACTION : defaultDurationWithoutAction;
  const durationRemaining = React.useRef(defaultDuration);
  const timeoutStart = React.useRef(null);
  const timer = React.useRef(null);
  React.useEffect(() => {
    function resume() {
      timeoutStart.current = Date.now();
      timer.current = setTimeout(() => {
        onDismiss();
      }, durationRemaining.current);
    }
    function pause() {
      if (timeoutStart.current) {
        durationRemaining.current -= Date.now() - timeoutStart.current;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = null;
    }
    if (isHovered) {
      pause();
    } else {
      resume();
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isHovered, onDismiss]);
  React.useEffect(() => {
    if (action && duration && duration < DEFAULT_TOAST_DURATION_WITH_ACTION) {
      // eslint-disable-next-line no-console
      console.log('Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.');
    }
  }, [action, duration]);
  const dismissMarkup = /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: Toast_module.default.CloseButton,
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.XSmallIcon,
    tone: "inherit"
  }));
  const actionMarkup = action ? /*#__PURE__*/React.createElement("div", {
    className: Toast_module.default.Action
  }, /*#__PURE__*/React.createElement(Button.Button, {
    variant: "monochromePlain",
    removeUnderline: true,
    size: "slim",
    onClick: action.onAction
  }, action.content)) : null;
  let leadingIconMarkup = null;
  if (error) {
    leadingIconMarkup = /*#__PURE__*/React.createElement("div", {
      className: Toast_module.default.LeadingIcon
    }, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.AlertCircleIcon,
      tone: "inherit"
    }));
  } else if (icon) {
    leadingIconMarkup = /*#__PURE__*/React.createElement("div", {
      className: Toast_module.default.LeadingIcon
    }, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon,
      tone: "inherit"
    }));
  }
  const className = css.classNames(Toast_module.default.Toast, error && Toast_module.default.error, tone && Toast_module.default[css.variationName('tone', tone)]);
  if (!action && onClick) {
    return /*#__PURE__*/React.createElement("button", {
      "aria-live": "assertive",
      className: css.classNames(className, Toast_module.default.WithActionOnComponent),
      type: "button",
      onClick: onClick
    }, /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
      keyCode: types.Key.Escape,
      handler: onDismiss
    }), leadingIconMarkup, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      gap: "400",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement(Text.Text, Object.assign({
      as: "span",
      variant: "bodyMd",
      fontWeight: "medium"
    }, tone === 'magic' && {
      tone: 'magic'
    }), content)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "aria-live": "assertive"
  }, /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    keyCode: types.Key.Escape,
    handler: onDismiss
  }), leadingIconMarkup, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text.Text, Object.assign({
    as: "span",
    variant: "bodyMd",
    fontWeight: "medium"
  }, tone === 'magic' && {
    tone: 'magic'
  }), content)), actionMarkup, dismissMarkup);
}

exports.DEFAULT_TOAST_DURATION = DEFAULT_TOAST_DURATION;
exports.DEFAULT_TOAST_DURATION_WITH_ACTION = DEFAULT_TOAST_DURATION_WITH_ACTION;
exports.Toast = Toast;
