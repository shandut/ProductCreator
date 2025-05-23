'use strict';

var React = require('react');
var Container_module = require('./Container.css.js');

const Container = ({
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: Container_module.default.Container
  }, children);
};

exports.Container = Container;
