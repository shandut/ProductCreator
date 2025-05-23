'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonDisplayText_module = require('./SkeletonDisplayText.css.js');

function SkeletonDisplayText({
  size = 'medium',
  maxWidth
}) {
  const className = css.classNames(SkeletonDisplayText_module.default.DisplayText, size && SkeletonDisplayText_module.default[css.variationName('size', size)]);
  const style = {
    '--pc-skeleton-display-text-max-width': maxWidth ?? undefined
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: css.sanitizeCustomProperties(style)
  });
}

exports.SkeletonDisplayText = SkeletonDisplayText;
