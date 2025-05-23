'use strict';

var React = require('react');
var FooterHelp_module = require('./FooterHelp.css.js');
var Text = require('../Text/Text.js');

function FooterHelp({
  children,
  align = 'center'
}) {
  const style = {
    '--pc-footer-help-align': align
  };
  return /*#__PURE__*/React.createElement("div", {
    className: FooterHelp_module.default.FooterHelp,
    style: style
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyLg"
  }, children));
}

exports.FooterHelp = FooterHelp;
