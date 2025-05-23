'use strict';

var React = require('react');
var Text = require('../../../Text/Text.js');

function TagsWrapper({
  children,
  hidden
}) {
  if (hidden) {
    return /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      visuallyHidden: true
    }, children);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
}

exports.TagsWrapper = TagsWrapper;
