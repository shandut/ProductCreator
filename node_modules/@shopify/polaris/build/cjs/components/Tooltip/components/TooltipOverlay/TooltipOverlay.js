'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var shared = require('../../../shared.js');
var TooltipOverlay_module = require('./TooltipOverlay.css.js');
var PositionedOverlay = require('../../../PositionedOverlay/PositionedOverlay.js');
var hooks = require('../../../../utilities/i18n/hooks.js');

const tailUpPaths = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "var(--p-color-tooltip-tail-up-border)"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg-surface)"
}));
const tailDownPaths = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "var(--p-color-tooltip-tail-down-border)"
}), /*#__PURE__*/React.createElement("path", {
  d: "M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z",
  fill: "var(--p-color-bg-surface)"
}));
function TooltipOverlay({
  active,
  activator,
  preferredPosition = 'above',
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  const i18n = hooks.useI18n();
  const markup = active ? /*#__PURE__*/React.createElement(PositionedOverlay.PositionedOverlay, {
    active: active,
    activator: activator,
    preferredPosition: preferredPosition,
    preventInteraction: preventInteraction,
    render: renderTooltip,
    zIndexOverride: zIndexOverride
  }) : null;
  return markup;
  function renderTooltip(overlayDetails) {
    const {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails;
    const containerClassName = css.classNames(TooltipOverlay_module.default.TooltipOverlay, measuring && TooltipOverlay_module.default.measuring, !measuring && TooltipOverlay_module.default.measured, instant && TooltipOverlay_module.default.instant, positioning === 'above' && TooltipOverlay_module.default.positionedAbove);
    const contentClassName = css.classNames(TooltipOverlay_module.default.Content, width && TooltipOverlay_module.default[width]);
    const contentStyles = measuring ? undefined : {
      minHeight: desiredHeight
    };
    const style = {
      '--pc-tooltip-chevron-x-pos': `${chevronOffset}px`,
      '--pc-tooltip-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
      '--pc-tooltip-padding': padding && padding === 'default' ? 'var(--p-space-100) var(--p-space-200)' : `var(--p-space-${padding})`
    };
    return /*#__PURE__*/React.createElement("div", Object.assign({
      style: style,
      className: containerClassName
    }, shared.layer.props), /*#__PURE__*/React.createElement("svg", {
      className: TooltipOverlay_module.default.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === 'above' ? tailDownPaths : tailUpPaths), /*#__PURE__*/React.createElement("div", {
      id: id,
      role: "tooltip",
      className: contentClassName,
      style: {
        ...contentStyles,
        ...style
      },
      "aria-label": accessibilityLabel ? i18n.translate('Polaris.TooltipOverlay.accessibilityLabel', {
        label: accessibilityLabel
      }) : undefined
    }, children));
  }
}

exports.TooltipOverlay = TooltipOverlay;
