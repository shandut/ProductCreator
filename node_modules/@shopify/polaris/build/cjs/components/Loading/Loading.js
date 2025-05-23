'use strict';

var React = require('react');
var hooks = require('../../utilities/frame/hooks.js');

const Loading = /*#__PURE__*/React.memo(function Loading() {
  const {
    startLoading,
    stopLoading
  } = hooks.useFrame();
  React.useEffect(() => {
    startLoading();
    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);
  return null;
});

exports.Loading = Loading;
