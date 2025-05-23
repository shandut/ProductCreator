import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../LegacyCard.css.js';
import { LegacyStack } from '../../../LegacyStack/LegacyStack.js';
import { ButtonGroup } from '../../../ButtonGroup/ButtonGroup.js';
import { buttonsFrom } from '../../../Button/utils.js';
import { Text } from '../../../Text/Text.js';

function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint
}) {
  const className = classNames(styles.Section, flush && styles['Section-flush'], subdued && styles['Section-subdued'], fullWidth && styles['Section-fullWidth'], hideOnPrint && styles['Section-hideOnPrint']);
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(actions, {
    variant: 'plain'
  })) : null;
  const titleMarkup = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text, {
    variant: "headingSm",
    as: "h3",
    fontWeight: "medium"
  }, title) : title;
  const titleAreaMarkup = titleMarkup || actionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: styles.SectionHeader
  }, actionMarkup ? /*#__PURE__*/React.createElement(LegacyStack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup) : titleMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, titleAreaMarkup, children);
}

export { Section };
