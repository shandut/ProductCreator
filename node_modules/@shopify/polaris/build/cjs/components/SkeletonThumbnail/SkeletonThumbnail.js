'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonThumbnail_module = require('./SkeletonThumbnail.css.js');

function SkeletonThumbnail({
  size = 'medium'
}) {
  const className = css.classNames(SkeletonThumbnail_module.default.SkeletonThumbnail, size && SkeletonThumbnail_module.default[css.variationName('size', size)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

exports.SkeletonThumbnail = SkeletonThumbnail;
