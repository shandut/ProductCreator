'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Tabs_module = require('../../Tabs.css.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');

const Item = /*#__PURE__*/React.memo(function Item({
  id,
  focused,
  children,
  url,
  accessibilityLabel,
  onClick = noop
}) {
  const focusedNode = React.useRef(null);
  React.useEffect(() => {
    const focusTarget = focusedNode.current;
    if (focusTarget && focusTarget instanceof HTMLElement && focused) {
      requestAnimationFrame(() => {
        focusTarget.focus();
      });
    }
  }, [focusedNode, focused]);
  const classname = css.classNames(Tabs_module.default.Item);
  const sharedProps = {
    id,
    ref: focusedNode,
    onClick,
    className: classname,
    'aria-selected': false,
    'aria-label': accessibilityLabel
  };
  const markup = url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, Object.assign({}, sharedProps, {
    url: url
  }), children) : /*#__PURE__*/React.createElement("button", Object.assign({}, sharedProps, {
    ref: focusedNode,
    type: "button"
  }), children);
  return /*#__PURE__*/React.createElement("li", null, markup);
});
function noop() {}

exports.Item = Item;
