import React, { useRef, useEffect } from 'react';
import { XSmallIcon, AlertCircleIcon } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../../../utilities/css.js';
import { Key } from '../../../../types.js';
import styles from './Toast.css.js';
import { Icon } from '../../../Icon/Icon.js';
import { Button } from '../../../Button/Button.js';
import { KeypressListener } from '../../../KeypressListener/KeypressListener.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Text } from '../../../Text/Text.js';

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
  const durationRemaining = useRef(defaultDuration);
  const timeoutStart = useRef(null);
  const timer = useRef(null);
  useEffect(() => {
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
  useEffect(() => {
    if (action && duration && duration < DEFAULT_TOAST_DURATION_WITH_ACTION) {
      // eslint-disable-next-line no-console
      console.log('Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.');
    }
  }, [action, duration]);
  const dismissMarkup = /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles.CloseButton,
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement(Icon, {
    source: XSmallIcon,
    tone: "inherit"
  }));
  const actionMarkup = action ? /*#__PURE__*/React.createElement("div", {
    className: styles.Action
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "monochromePlain",
    removeUnderline: true,
    size: "slim",
    onClick: action.onAction
  }, action.content)) : null;
  let leadingIconMarkup = null;
  if (error) {
    leadingIconMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.LeadingIcon
    }, /*#__PURE__*/React.createElement(Icon, {
      source: AlertCircleIcon,
      tone: "inherit"
    }));
  } else if (icon) {
    leadingIconMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.LeadingIcon
    }, /*#__PURE__*/React.createElement(Icon, {
      source: icon,
      tone: "inherit"
    }));
  }
  const className = classNames(styles.Toast, error && styles.error, tone && styles[variationName('tone', tone)]);
  if (!action && onClick) {
    return /*#__PURE__*/React.createElement("button", {
      "aria-live": "assertive",
      className: classNames(className, styles.WithActionOnComponent),
      type: "button",
      onClick: onClick
    }, /*#__PURE__*/React.createElement(KeypressListener, {
      keyCode: Key.Escape,
      handler: onDismiss
    }), leadingIconMarkup, /*#__PURE__*/React.createElement(InlineStack, {
      gap: "400",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement(Text, Object.assign({
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
  }, /*#__PURE__*/React.createElement(KeypressListener, {
    keyCode: Key.Escape,
    handler: onDismiss
  }), leadingIconMarkup, /*#__PURE__*/React.createElement(InlineStack, {
    gap: "400",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text, Object.assign({
    as: "span",
    variant: "bodyMd",
    fontWeight: "medium"
  }, tone === 'magic' && {
    tone: 'magic'
  }), content)), actionMarkup, dismissMarkup);
}

export { DEFAULT_TOAST_DURATION, DEFAULT_TOAST_DURATION_WITH_ACTION, Toast };
