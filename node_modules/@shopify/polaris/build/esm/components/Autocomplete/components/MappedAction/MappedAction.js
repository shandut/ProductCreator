import React, { useMemo } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './MappedAction.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Icon } from '../../../Icon/Icon.js';
import { Badge } from '../../../Badge/Badge.js';
import { Text } from '../../../Text/Text.js';
import { MappedActionContext } from '../../../../utilities/autocomplete/context.js';
import { Listbox } from '../../../Listbox/Listbox.js';

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
  const i18n = useI18n();
  let prefixMarkup = null;
  if (prefix) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.Prefix
    }, /*#__PURE__*/React.createElement(Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /*#__PURE__*/React.createElement("div", {
      role: "presentation",
      className: styles.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  const badgeMarkup = badge && /*#__PURE__*/React.createElement("span", {
    className: styles.Suffix
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: badge.tone
  }, badge.content));
  const suffixMarkup = suffix && /*#__PURE__*/React.createElement("span", {
    className: styles.Suffix
  }, suffix);
  const contentText = ellipsis && content ? i18n.translate('Polaris.Autocomplete.ellipsis', {
    content
  }) : content;
  const contentMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodyMd",
    breakWord: wrapOverflow
  }, contentText), helpText ? /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "bodyMd",
    tone: "subdued"
  }, helpText) : null);
  const context = useMemo(() => ({
    role,
    url,
    external,
    onAction,
    destructive
  }), [role, url, external, onAction, destructive]);
  const actionClassNames = classNames(styles.Action, disabled && styles.disabled, destructive && styles.destructive, active && styles.selected);
  return /*#__PURE__*/React.createElement(MappedActionContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.ActionContainer
  }, /*#__PURE__*/React.createElement(Listbox.Action, {
    selected: active,
    disabled: disabled,
    value: content || ''
  }, /*#__PURE__*/React.createElement("div", {
    className: actionClassNames
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Content
  }, prefixMarkup, contentMarkup, badgeMarkup, suffixMarkup)))));
}

export { MappedAction };
