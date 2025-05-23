'use strict';

var React = require('react');

const Image = /*#__PURE__*/React.forwardRef(({
  alt,
  sourceSet,
  source,
  crossOrigin,
  onLoad,
  className,
  ...rest
}, ref) => {
  const finalSourceSet = sourceSet ? sourceSet.map(({
    source: subSource,
    descriptor
  }) => `${subSource} ${descriptor}`).join(',') : null;
  const handleLoad = React.useCallback(() => {
    if (onLoad) onLoad();
  }, [onLoad]);
  return /*#__PURE__*/React.createElement("img", Object.assign({
    ref: ref,
    alt: alt,
    src: source,
    crossOrigin: crossOrigin,
    className: className,
    onLoad: handleLoad
  }, finalSourceSet ? {
    srcSet: finalSourceSet
  } : {}, rest));
});
Image.displayName = 'Image';

exports.Image = Image;
