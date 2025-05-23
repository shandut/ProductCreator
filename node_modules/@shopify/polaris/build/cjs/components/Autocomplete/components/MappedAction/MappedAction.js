'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var MappedAction_module = require('./MappedAction.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var Badge = require('../../../Badge/Badge.js');
var Text = require('../../../Text/Text.js');
var context = require('../../../../utilities/autocomplete/context.js');
var Listbox = require('../../../Listbox/Listbox.js');

function MappedAction({
  active,
  content,
  disabled,
  icon,
  image,
  prefix,
  suffix,
  ellipsis,
  role,
  url,
  external,
  onAction,
  destructive,
  badge,
  helpText,
  wrapOverflow = false
}) {
  const i18n = hooks.useI18n();
  let prefixMarkup = null;
  if (prefix) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      className: MappedAction_module.default.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      className: MappedAction_module.default.Prefix
    }, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      role: "presentation",
      className: MappedAction_module.default.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  const badgeMarkup = badge && /*#__PURE__*/React.createElement("span", {
    className: MappedAction_module.default.Suffix
  }, /*#__PURE__*/React.createElement(Badge.Badge, {
    tone: badge.tone
  }, badge.content));
  const suffixMarkup = suffix && /*#__PURE__*/React.createElement("span", {
    className: MappedAction_module.default.Suffix
  }, suffix);
  const contentText = ellipsis && content ? i18n.translate('Polaris.Autocomplete.ellipsis', {
    content
  }) : content;
  const contentMarkup = /*#__PURE__*/React.createElement("div", {
    className: MappedAction_module.default.Text
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyMd",
    breakWord: wrapOverflow
  }, contentText), helpText ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyMd",
    tone: "subdued"
  }, helpText) : null);
  const context$1 = React.useMemo(() => ({
    role,
    url,
    external,
    onAction,
    destructive
  }), [role, url, external, onAction, destructive]);
  const actionClassNames = css.classNames(MappedAction_module.default.Action, disabled && MappedAction_module.default.disabled, destructive && MappedAction_module.default.destructive, active && MappedAction_module.default.selected);
  return /*#__PURE__*/React.createElement(context.MappedActionContext.Provider, {
    value: context$1
  }, /*#__PURE__*/React.createElement("div", {
    className: MappedAction_module.default.ActionContainer
  }, /*#__PURE__*/React.createElement(Listbox.Listbox.Action, {
    selected: active,
    disabled: disabled,
    value: content || ''
  }, /*#__PURE__*/React.createElement("div", {
    className: actionClassNames
  }, /*#__PURE__*/React.createElement("div", {
    className: MappedAction_module.default.Content
  }, prefixMarkup, contentMarkup, badgeMarkup, suffixMarkup)))));
}

exports.MappedAction = MappedAction;
