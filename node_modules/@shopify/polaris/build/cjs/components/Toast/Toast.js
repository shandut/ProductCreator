'use strict';

var React = require('react');
var useDeepEffect = require('../../utilities/use-deep-effect.js');
var hooks = require('../../utilities/frame/hooks.js');

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.

const Toast = /*#__PURE__*/React.memo(function Toast(props) {
  const id = React.useId();
  const {
    showToast,
    hideToast
  } = hooks.useFrame();
  useDeepEffect.useDeepEffect(() => {
    showToast({
      id,
      ...props
    });
    return () => {
      hideToast({
        id
      });
    };
  }, [props]);
  return null;
});

exports.Toast = Toast;
