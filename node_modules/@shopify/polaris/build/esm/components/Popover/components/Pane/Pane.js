import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { wrapWithComponent } from '../../../../utilities/components.js';
import styles from '../../Popover.css.js';
import { Section } from '../Section/Section.js';
import { Scrollable } from '../../../Scrollable/Scrollable.js';

function Pane({
  captureOverscroll = false,
  fixed,
  sectioned,
  children,
  height,
  maxHeight,
  minHeight,
  subdued,
  onScrolledToBottom
}) {
  const className = classNames(styles.Pane, fixed && styles['Pane-fixed'], subdued && styles['Pane-subdued'], captureOverscroll && styles['Pane-captureOverscroll']);
  const content = sectioned ? wrapWithComponent(children, Section, {}) : children;
  const style = {
    height,
    maxHeight,
    minHeight
  };
  return fixed ? /*#__PURE__*/React.createElement("div", {
    style: style,
    className: className
  }, content) : /*#__PURE__*/React.createElement(Scrollable, {
    shadow: true,
    className: className,
    style: style,
    onScrolledToBottom: onScrolledToBottom,
    scrollbarWidth: "thin"
  }, content);
}

export { Pane };
