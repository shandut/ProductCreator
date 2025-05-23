'use strict';

var React = require('react');
var SkeletonBodyText_module = require('./SkeletonBodyText.css.js');

function SkeletonBodyText({
  lines = 3
}) {
  const bodyTextLines = [];
  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(/*#__PURE__*/React.createElement("div", {
      className: SkeletonBodyText_module.default.SkeletonBodyText,
      key: i
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: SkeletonBodyText_module.default.SkeletonBodyTextContainer
  }, bodyTextLines);
}

exports.SkeletonBodyText = SkeletonBodyText;
