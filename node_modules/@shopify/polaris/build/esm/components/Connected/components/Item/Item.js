import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { useToggle } from '../../../../utilities/use-toggle.js';
import styles from '../../Connected.css.js';

function Item({
  children,
  position
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles.Item, focused && styles['Item-focused'], position === 'primary' ? styles['Item-primary'] : styles['Item-connection']);
  return /*#__PURE__*/React.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className: className
  }, children);
}

export { Item };
