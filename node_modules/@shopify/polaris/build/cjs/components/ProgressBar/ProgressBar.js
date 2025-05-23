'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../utilities/css.js');
var useTheme = require('../../utilities/use-theme.js');
var ProgressBar_module = require('./ProgressBar.css.js');
var hooks = require('../../utilities/i18n/hooks.js');

function ProgressBar({
  progress = 0,
  size = 'medium',
  tone = 'highlight',
  animated: hasAppearAnimation = true,
  ariaLabelledBy
}) {
  const theme = useTheme.useTheme();
  const i18n = hooks.useI18n();
  const indicatorRef = React.useRef(null);
  const className = css.classNames(ProgressBar_module.default.ProgressBar, size && ProgressBar_module.default[css.variationName('size', size)], tone && ProgressBar_module.default[css.variationName('tone', tone)]);
  const warningMessage = i18n.translate(progress < 0 ? 'Polaris.ProgressBar.negativeWarningMessage' : 'Polaris.ProgressBar.exceedWarningMessage', {
    progress
  });
  const parsedProgress = parseProgress(progress, warningMessage);
  const progressBarDuration = hasAppearAnimation ? theme.motion['motion-duration-500'] : theme.motion['motion-duration-0'];

  /* eslint-disable @shopify/jsx-no-hardcoded-content */
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("progress", {
    "aria-labelledby": ariaLabelledBy,
    className: ProgressBar_module.default.Progress,
    value: parsedProgress,
    max: "100"
  }), /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
    in: true,
    appear: true,
    timeout: parseInt(progressBarDuration, 10),
    nodeRef: indicatorRef,
    classNames: {
      appearActive: ProgressBar_module.default.IndicatorAppearActive,
      appearDone: ProgressBar_module.default.IndicatorAppearDone
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: indicatorRef,
    className: ProgressBar_module.default.Indicator,
    style: {
      '--pc-progress-bar-duration': progressBarDuration,
      '--pc-progress-bar-percent': parsedProgress / 100
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: ProgressBar_module.default.Label
  }, parsedProgress, "%"))))
  /* eslint-enable @shopify/jsx-no-hardcoded-content */;
}
function parseProgress(progress, warningMessage) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

exports.ProgressBar = ProgressBar;
