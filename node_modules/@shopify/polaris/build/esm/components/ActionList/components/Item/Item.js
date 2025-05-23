import React, { useRef, useState } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../ActionList.css.js';
import { handleMouseUpByBlurring } from '../../../../utilities/focus.js';
import { useIsomorphicLayoutEffect } from '../../../../utilities/use-isomorphic-layout-effect.js';
import { useTheme } from '../../../../utilities/use-theme.js';
import { Badge } from '../../../Badge/Badge.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Icon } from '../../../Icon/Icon.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';
import { Scrollable } from '../../../Scrollable/Scrollable.js';
import { UnstyledLink } from '../../../UnstyledLink/UnstyledLink.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';

function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  truncate,
  active,
  role,
  variant = 'default'
}) {
  const className = classNames(styles.Item, disabled && styles.disabled, destructive && styles.destructive, active && styles.active, variant === 'default' && styles.default, variant === 'indented' && styles.indented, variant === 'menu' && styles.menu);
  let prefixMarkup = null;
  if (prefix) {
    prefixMarkup = /*#__PURE__*/React.createElement("span", {
      className: styles.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /*#__PURE__*/React.createElement("span", {
      className: styles.Prefix
    }, /*#__PURE__*/React.createElement(Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /*#__PURE__*/React.createElement("span", {
      role: "presentation",
      className: styles.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  let contentText = content || '';
  if (truncate && content) {
    contentText = /*#__PURE__*/React.createElement(TruncateText, null, content);
  } else if (ellipsis) {
    contentText = `${content}…`;
  }
  const contentMarkup = helpText ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, null, contentText), /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    tone: active || disabled ? undefined : 'subdued'
  }, helpText)) : /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? 'semibold' : 'regular'
  }, contentText);
  const badgeMarkup = badge && /*#__PURE__*/React.createElement("span", {
    className: styles.Suffix
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: badge.tone
  }, badge.content));
  const suffixMarkup = suffix && /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement("span", {
    className: styles.Suffix
  }, suffix));
  const textMarkup = /*#__PURE__*/React.createElement("span", {
    className: styles.Text
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    fontWeight: active ? 'semibold' : 'regular'
  }, contentMarkup));
  const contentElement = /*#__PURE__*/React.createElement(InlineStack, {
    blockAlign: "center",
    gap: "150",
    wrap: false
  }, prefixMarkup, textMarkup, badgeMarkup, suffixMarkup);
  const contentWrapper = /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, contentElement);
  const scrollMarkup = active ? /*#__PURE__*/React.createElement(Scrollable.ScrollTo, null) : null;
  const control = url ? /*#__PURE__*/React.createElement(UnstyledLink, {
    id: id,
    url: disabled ? null : url,
    className: className,
    external: external,
    "aria-label": accessibilityLabel,
    onClick: disabled ? null : onAction,
    role: role
  }, contentWrapper) : /*#__PURE__*/React.createElement("button", {
    id: id,
    type: "button",
    className: className,
    disabled: disabled,
    "aria-label": accessibilityLabel,
    onClick: onAction,
    onMouseUp: handleMouseUpByBlurring,
    role: role,
    onMouseEnter: onMouseEnter
  }, contentWrapper);
  return /*#__PURE__*/React.createElement(React.Fragment, null, scrollMarkup, control);
}
const TruncateText = ({
  children
}) => {
  const theme = useTheme();
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.offsetWidth);
    }
  }, [children]);
  const text = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    truncate: true
  }, /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    ref: textRef
  }, children));
  return isOverflowing ? /*#__PURE__*/React.createElement(Tooltip, {
    zIndexOverride: Number(theme.zIndex['z-index-11']),
    preferredPosition: "above",
    hoverDelay: 1000,
    content: children,
    dismissOnMouseOut: true
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    truncate: true
  }, children)) : text;
};

export { Item, TruncateText };
