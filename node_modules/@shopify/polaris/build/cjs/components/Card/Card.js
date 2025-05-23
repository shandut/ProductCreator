'use strict';

var React = require('react');
var breakpoints = require('../../utilities/breakpoints.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var ShadowBevel = require('../ShadowBevel/ShadowBevel.js');
var Box = require('../Box/Box.js');

const Card = ({
  children,
  background = 'bg-surface',
  padding = {
    xs: '400'
  },
  roundedAbove = 'sm'
}) => {
  const breakpoints$1 = breakpoints.useBreakpoints();
  const defaultBorderRadius = '300';
  const hasBorderRadius = Boolean(breakpoints$1[`${roundedAbove}Up`]);
  return /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(ShadowBevel.ShadowBevel, {
    boxShadow: "100",
    borderRadius: hasBorderRadius ? defaultBorderRadius : '0',
    zIndex: "32"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: background,
    padding: padding,
    overflowX: "clip",
    overflowY: "clip",
    minHeight: "100%"
  }, children)));
};

exports.Card = Card;
