import React from 'react';
import { classNames } from '../../../../../../utilities/css.js';
import { useToggle } from '../../../../../../utilities/use-toggle.js';
import styles from '../../ConnectedFilterControl.css.js';

function Item({
  children
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles.Item, focused && styles['Item-focused']);
  return /*#__PURE__*/React.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className: className
  }, children);
}

export { Item };
