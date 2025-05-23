import React, { forwardRef, useCallback } from 'react';

const Image = /*#__PURE__*/forwardRef(({
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
  const handleLoad = useCallback(() => {
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

export { Image };
