import React from 'react';

var SvgSkeletonIcon = function SvgSkeletonIcon(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /*#__PURE__*/React.createElement("rect", {
    width: 14,
    height: 14,
    x: 3,
    y: 3,
    fillOpacity: 0.12,
    rx: 4
  }));
};
SvgSkeletonIcon.displayName = "SkeletonIcon";

export { SvgSkeletonIcon as S };
