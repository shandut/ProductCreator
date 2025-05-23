import React from 'react';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../ButtonGroup.css.js';

function Item({
  button
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles.Item, focused && styles['Item-focused'], button.props.variant === 'plain' && styles['Item-plain']);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

export { Item };
