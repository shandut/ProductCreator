import React from 'react';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import { ShadowBevel } from '../ShadowBevel/ShadowBevel.js';
import { Box } from '../Box/Box.js';

const Card = ({
  children,
  background = 'bg-surface',
  padding = {
    xs: '400'
  },
  roundedAbove = 'sm'
}) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius = '300';
  const hasBorderRadius = Boolean(breakpoints[`${roundedAbove}Up`]);
  return /*#__PURE__*/React.createElement(WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(ShadowBevel, {
    boxShadow: "100",
    borderRadius: hasBorderRadius ? defaultBorderRadius : '0',
    zIndex: "32"
  }, /*#__PURE__*/React.createElement(Box, {
    background: background,
    padding: padding,
    overflowX: "clip",
    overflowY: "clip",
    minHeight: "100%"
  }, children)));
};

export { Card };
