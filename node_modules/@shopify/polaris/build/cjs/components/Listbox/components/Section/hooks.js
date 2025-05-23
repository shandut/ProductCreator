'use strict';

var React = require('react');
var context = require('./context.js');

function useSection() {
  const context$1 = React.useContext(context.SectionContext);
  return context$1;
}

exports.useSection = useSection;
