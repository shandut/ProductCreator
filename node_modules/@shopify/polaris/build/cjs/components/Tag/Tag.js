'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var focus = require('../../utilities/focus.js');
var Tag_module = require('./Tag.css.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');
var Icon = require('../Icon/Icon.js');

function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url,
  size
}) {
  const i18n = hooks.useI18n();
  const segmented = onRemove && url;
  const className = css.classNames(Tag_module.default.Tag, disabled && Tag_module.default.disabled, onClick && Tag_module.default.clickable, onRemove && Tag_module.default.removable, url && !disabled && Tag_module.default.linkable, segmented && Tag_module.default.segmented, size && Tag_module.default[css.variationName('size', size)]);
  let tagTitle = accessibilityLabel;
  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }
  const tagText = /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    truncate: true
  }, /*#__PURE__*/React.createElement("span", {
    title: tagTitle,
    className: Tag_module.default.Text
  }, children));
  if (onClick) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: disabled,
      className: className,
      onClick: onClick
    }, tagText);
  }
  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || ''
  });
  const removeButton = onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": ariaLabel,
    className: css.classNames(Tag_module.default.Button, segmented && Tag_module.default.segmented),
    onClick: onRemove,
    onMouseUp: focus.handleMouseUpByBlurring,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.XSmallIcon
  })) : null;
  const tagContent = url && !disabled ? /*#__PURE__*/React.createElement("a", {
    className: css.classNames(Tag_module.default.Link, segmented && Tag_module.default.segmented),
    href: url
  }, tagText) : tagText;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    "aria-disabled": disabled
  }, tagContent, size === 'large' && /*#__PURE__*/React.createElement("span", {
    className: Tag_module.default.overlay
  }), removeButton);
}

exports.Tag = Tag;
