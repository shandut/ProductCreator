'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var TextContainer_module = require('./TextContainer.css.js');

/** @deprecated Use BlockStack instead */
function TextContainer({
  spacing,
  children
}) {
  const className = css.classNames(TextContainer_module.default.TextContainer, spacing && TextContainer_module.default[css.variationName('spacing', spacing)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.TextContainer = TextContainer;
