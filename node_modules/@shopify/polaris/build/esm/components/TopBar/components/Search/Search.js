import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Search.css.js';
import { SearchDismissOverlay } from '../SearchDismissOverlay/SearchDismissOverlay.js';

function Search({
  visible,
  children,
  onDismiss,
  overlayVisible = false
}) {
  if (children == null) {
    return null;
  }
  const overlayMarkup = visible ? /*#__PURE__*/React.createElement(SearchDismissOverlay, {
    onDismiss: onDismiss,
    visible: overlayVisible
  }) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, overlayMarkup, /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Search, visible && styles.visible)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.SearchContent
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Results
  }, children))));
}

export { Search };
