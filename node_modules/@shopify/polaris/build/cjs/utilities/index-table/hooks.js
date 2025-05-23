'use strict';

var React = require('react');
var context = require('./context.js');

function useRowHovered() {
  const hovered = React.useContext(context.RowHoveredContext);
  return hovered;
}
function useRowSelected() {
  const {
    selected
  } = React.useContext(context.RowContext);
  return selected;
}
function useContainerScroll() {
  const scrolledContainerRef = React.useContext(context.ScrollContext);
  return scrolledContainerRef;
}

exports.useContainerScroll = useContainerScroll;
exports.useRowHovered = useRowHovered;
exports.useRowSelected = useRowSelected;
