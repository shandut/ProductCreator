'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var breakpoints = require('../../utilities/breakpoints.js');
var Icon_module = require('./Icon.css.js');
var Text = require('../Text/Text.js');

function Icon({
  source,
  tone,
  accessibilityLabel
}) {
  let sourceType;
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }
  if (tone && sourceType === 'external' && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Recoloring external SVGs is not supported. Set the intended color on your SVG instead.');
  }
  const className = css.classNames(Icon_module.default.Icon, tone && Icon_module.default[css.variationName('tone', tone)]);
  const {
    mdDown
  } = breakpoints.useBreakpoints();
  const SourceComponent = source;
  const contentMarkup = {
    function: /*#__PURE__*/React.createElement(SourceComponent, Object.assign({
      className: Icon_module.default.Svg,
      focusable: "false",
      "aria-hidden": "true"
      // On Mobile we're scaling the viewBox to 18x18 to make the icons bigger
      // Also, we're setting the viewport origin to 1x1 to center the icon
      // We use this syntax so we don't override the existing viewBox value if we don't need to.
    }, mdDown ? {
      viewBox: '1 1 18 18'
    } : {})),
    placeholder: /*#__PURE__*/React.createElement("div", {
      className: Icon_module.default.Placeholder
    }),
    external: /*#__PURE__*/React.createElement("img", {
      className: Icon_module.default.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, accessibilityLabel && /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel), contentMarkup[sourceType]);
}

exports.Icon = Icon;
