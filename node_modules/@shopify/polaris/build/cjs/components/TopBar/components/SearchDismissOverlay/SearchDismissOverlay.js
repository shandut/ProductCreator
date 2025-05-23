'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var SearchDismissOverlay_module = require('./SearchDismissOverlay.css.js');
var ScrollLock = require('../../../ScrollLock/ScrollLock.js');

function SearchDismissOverlay({
  onDismiss,
  visible
}) {
  const node = React.useRef(null);
  const handleDismiss = React.useCallback(({
    target
  }) => {
    if (target === node.current && onDismiss != null) {
      onDismiss();
    }
  }, [onDismiss]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible ? /*#__PURE__*/React.createElement(ScrollLock.ScrollLock, null) : null, /*#__PURE__*/React.createElement("div", {
    ref: node,
    className: css.classNames(SearchDismissOverlay_module.default.SearchDismissOverlay, visible && SearchDismissOverlay_module.default.visible),
    onClick: handleDismiss
  }));
}

exports.SearchDismissOverlay = SearchDismissOverlay;
