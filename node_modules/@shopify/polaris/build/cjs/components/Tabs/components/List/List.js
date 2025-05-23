'use strict';

var React = require('react');
var Tabs_module = require('../../Tabs.css.js');
var Item = require('../Item/Item.js');

function List({
  focusIndex,
  disclosureTabs,
  onClick = noop,
  onKeyPress = noop
}) {
  const tabs = disclosureTabs.map(({
    id,
    content,
    ...tabProps
  }, index) => {
    return /*#__PURE__*/React.createElement(Item.Item, Object.assign({
      key: id
    }, tabProps, {
      id: id,
      focused: index === focusIndex,
      onClick: onClick.bind(null, id)
    }), content);
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: Tabs_module.default.List,
    onKeyDown: handleKeyDown,
    onKeyUp: onKeyPress
  }, tabs);
}
function noop() {}
function handleKeyDown(event) {
  const {
    key
  } = event;
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}

exports.List = List;
