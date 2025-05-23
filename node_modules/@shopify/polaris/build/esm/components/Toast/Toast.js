import { memo, useId } from 'react';
import { useDeepEffect } from '../../utilities/use-deep-effect.js';
import { useFrame } from '../../utilities/frame/hooks.js';

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.

const Toast = /*#__PURE__*/memo(function Toast(props) {
  const id = useId();
  const {
    showToast,
    hideToast
  } = useFrame();
  useDeepEffect(() => {
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

export { Toast };
