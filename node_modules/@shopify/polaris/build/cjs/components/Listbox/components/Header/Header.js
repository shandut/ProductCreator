'use strict';

var React = require('react');
var hooks = require('../Section/hooks.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');

function Header({
  children
}) {
  const sectionId = hooks.useSection() || '';
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "200",
    paddingInlineStart: "400",
    paddingBlockEnd: "200",
    paddingInlineEnd: "400"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "headingSm",
    tone: "subdued"
  }, children)) : children;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    id: sectionId
  }, content);
}

exports.Header = Header;
