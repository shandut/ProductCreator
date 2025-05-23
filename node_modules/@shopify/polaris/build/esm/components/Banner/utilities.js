import { CheckIcon, AlertTriangleIcon, AlertDiamondIcon, InfoIcon } from '@shopify/polaris-icons';
import { useRef, useState, useImperativeHandle } from 'react';

const bannerAttributes = {
  success: {
    withinPage: {
      background: 'bg-fill-success',
      text: 'text-success-on-bg-fill',
      icon: 'text-success-on-bg-fill'
    },
    withinContentContainer: {
      background: 'bg-surface-success',
      text: 'text-success',
      icon: 'text-success'
    },
    icon: CheckIcon
  },
  warning: {
    withinPage: {
      background: 'bg-fill-warning',
      text: 'text-warning-on-bg-fill',
      icon: 'text-warning-on-bg-fill'
    },
    withinContentContainer: {
      background: 'bg-surface-warning',
      text: 'text-warning',
      icon: 'text-warning'
    },
    icon: AlertTriangleIcon
  },
  critical: {
    withinPage: {
      background: 'bg-fill-critical',
      text: 'text-critical-on-bg-fill',
      icon: 'text-critical-on-bg-fill'
    },
    withinContentContainer: {
      background: 'bg-surface-critical',
      text: 'text-critical',
      icon: 'text-critical'
    },
    icon: AlertDiamondIcon
  },
  info: {
    withinPage: {
      background: 'bg-fill-info',
      text: 'text-info-on-bg-fill',
      icon: 'text-info-on-bg-fill'
    },
    withinContentContainer: {
      background: 'bg-surface-info',
      text: 'text-info',
      icon: 'text-info'
    },
    icon: InfoIcon
  }
};
function useBannerFocus(bannerRef) {
  const wrapperRef = useRef(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);
  useImperativeHandle(bannerRef, () => ({
    focus: () => {
      wrapperRef.current?.focus();
      setShouldShowFocus(true);
    }
  }), []);
  const handleKeyUp = event => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };
  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = event => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };
  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  };
}

export { bannerAttributes, useBannerFocus };
