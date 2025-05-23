import React, { memo } from 'react';
import styles from '../../DatePicker.css.js';
import { Text } from '../../../Text/Text.js';

const Weekday = /*#__PURE__*/memo(function Weekday({
  label,
  title,
  current
}) {
  return /*#__PURE__*/React.createElement("th", {
    "aria-label": label,
    scope: "col",
    className: styles.Weekday
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    alignment: "center",
    fontWeight: current ? 'bold' : 'regular',
    tone: !current ? 'subdued' : undefined
  }, title));
});

export { Weekday };
