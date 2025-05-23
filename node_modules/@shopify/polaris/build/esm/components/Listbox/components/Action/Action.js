import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { ActionContext } from '../../../../utilities/listbox/context.js';
import styles from './Action.css.js';
import { Option } from '../Option/Option.js';
import { TextOption } from '../TextOption/TextOption.js';
import { Icon } from '../../../Icon/Icon.js';

function Action(props) {
  const {
    selected,
    disabled,
    children,
    icon,
    divider
  } = props;
  const iconMarkup = icon && /*#__PURE__*/React.createElement("div", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    tone: "subdued",
    source: icon
  }));
  const className = classNames(styles.Action, divider && styles.ActionDivider);
  return /*#__PURE__*/React.createElement(ActionContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(Option, props, /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(TextOption, {
    selected: selected,
    disabled: disabled
  }, iconMarkup, children))));
}

export { Action };
