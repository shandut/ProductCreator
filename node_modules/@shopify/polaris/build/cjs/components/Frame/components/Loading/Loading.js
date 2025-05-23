'use strict';

var React = require('react');
var useIsMountedRef = require('../../../../utilities/use-is-mounted-ref.js');
var Loading_module = require('./Loading.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');

const STUCK_THRESHOLD = 99;
function Loading() {
  const i18n = hooks.useI18n();
  const isMountedRef = useIsMountedRef.useIsMountedRef();
  const [progress, setProgress] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  React.useEffect(() => {
    if (progress >= STUCK_THRESHOLD || animating) {
      return;
    }
    requestAnimationFrame(() => {
      if (!isMountedRef.current) return;
      const step = Math.max((STUCK_THRESHOLD - progress) / 10, 1);
      setAnimating(true);
      setProgress(progress + step);
    });
  }, [progress, animating, isMountedRef]);
  const customStyles = {
    transform: `scaleX(${Math.floor(progress) / 100})`
  };
  return /*#__PURE__*/React.createElement("div", {
    className: Loading_module.default.Loading,
    "aria-valuenow": progress,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    role: "progressbar",
    "aria-label": i18n.translate('Polaris.Loading.label')
  }, /*#__PURE__*/React.createElement("div", {
    className: Loading_module.default.Level,
    style: customStyles,
    onTransitionEnd: () => setAnimating(false)
  }));
}

exports.Loading = Loading;
