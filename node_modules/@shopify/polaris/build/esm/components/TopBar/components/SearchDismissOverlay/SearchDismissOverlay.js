import React, { useRef, useCallback } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './SearchDismissOverlay.css.js';
import { ScrollLock } from '../../../ScrollLock/ScrollLock.js';

function SearchDismissOverlay({
  onDismiss,
  visible
}) {
  const node = useRef(null);
  const handleDismiss = useCallback(({
    target
  }) => {
    if (target === node.current && onDismiss != null) {
      onDismiss();
    }
  }, [onDismiss]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible ? /*#__PURE__*/React.createElement(ScrollLock, null) : null, /*#__PURE__*/React.createElement("div", {
    ref: node,
    className: classNames(styles.SearchDismissOverlay, visible && styles.visible),
    onClick: handleDismiss
  }));
}

export { SearchDismissOverlay };
