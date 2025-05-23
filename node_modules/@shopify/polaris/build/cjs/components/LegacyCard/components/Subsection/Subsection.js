'use strict';

var React = require('react');
var LegacyCard_module = require('../../LegacyCard.css.js');

function Subsection({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: LegacyCard_module.default.Subsection
  }, children);
}

exports.Subsection = Subsection;
