'use strict';

var React = require('react');
var DualThumb = require('./components/DualThumb/DualThumb.js');
var SingleThumb = require('./components/SingleThumb/SingleThumb.js');

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.

function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  ...rest
}) {
  const id = React.useId();
  const sharedProps = {
    id,
    min,
    max,
    step,
    ...rest
  };
  return isDualThumb(value) ? /*#__PURE__*/React.createElement(DualThumb.DualThumb, Object.assign({
    value: value
  }, sharedProps)) : /*#__PURE__*/React.createElement(SingleThumb.SingleThumb, Object.assign({
    value: value
  }, sharedProps));
}
function isDualThumb(value) {
  return Array.isArray(value);
}

exports.RangeSlider = RangeSlider;
