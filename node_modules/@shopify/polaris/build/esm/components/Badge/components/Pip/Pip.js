import React from 'react';
import { classNames, variationName } from '../../../../utilities/css.js';
import { getDefaultAccessibilityLabel } from '../../utils.js';
import styles from './Pip.css.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Text } from '../../../Text/Text.js';

function Pip({
  tone,
  progress = 'complete',
  accessibilityLabelOverride
}) {
  const i18n = useI18n();
  const className = classNames(styles.Pip, tone && styles[variationName('tone', tone)], progress && styles[variationName('progress', progress)]);
  const accessibilityLabel = accessibilityLabelOverride ? accessibilityLabelOverride : getDefaultAccessibilityLabel(i18n, progress, tone);
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel));
}

export { Pip };
