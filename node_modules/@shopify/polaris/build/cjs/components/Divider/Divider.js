'use strict';

var React = require('react');
var Divider_module = require('./Divider.css.js');

const Divider = ({
  borderColor = 'border-secondary',
  borderWidth = '025'
}) => {
  const borderColorValue = borderColor === 'transparent' ? borderColor : `var(--p-color-${borderColor})`;
  return /*#__PURE__*/React.createElement("hr", {
    className: Divider_module.default.Divider,
    style: {
      borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`
    }
  });
};

exports.Divider = Divider;
