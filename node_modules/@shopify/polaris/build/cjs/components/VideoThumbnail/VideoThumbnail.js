'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var duration = require('../../utilities/duration.js');
var VideoThumbnail_module = require('./VideoThumbnail.css.js');
var hooks = require('../../utilities/i18n/hooks.js');
var hooks$1 = require('../../utilities/media-query/hooks.js');
var LegacyStack = require('../LegacyStack/LegacyStack.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');

function VideoThumbnail({
  thumbnailUrl,
  videoLength = 0,
  videoProgress = 0,
  showVideoProgress = false,
  accessibilityLabel,
  onClick,
  onBeforeStartPlaying
}) {
  const i18n = hooks.useI18n();
  const {
    isNavigationCollapsed
  } = hooks$1.useMediaQuery();
  let buttonLabel;
  if (accessibilityLabel) {
    buttonLabel = accessibilityLabel;
  } else if (videoLength) {
    const {
      hours,
      minutes,
      seconds
    } = duration.secondsToTimeComponents(videoLength);
    buttonLabel = i18n.translate('Polaris.VideoThumbnail.playButtonA11yLabel.defaultWithDuration', {
      duration: i18n.translate(duration.secondsToDurationTranslationKey(videoLength), {
        hourCount: hours,
        minuteCount: minutes,
        secondCount: seconds
      })
    });
  } else {
    buttonLabel = i18n.translate('Polaris.VideoThumbnail.playButtonA11yLabel.default');
  }
  const timeStampMarkup = videoLength ? /*#__PURE__*/React.createElement("div", {
    className: VideoThumbnail_module.default.Timestamp
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    alignment: "center",
    spacing: "extraTight"
  }, /*#__PURE__*/React.createElement("span", {
    className: VideoThumbnail_module.default.PlayIcon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.PlayIcon
  })), /*#__PURE__*/React.createElement(Text.Text, {
    variant: isNavigationCollapsed ? 'bodyLg' : 'bodyMd',
    as: "p",
    fontWeight: "semibold"
  }, duration.secondsToTimestamp(videoLength)))) : null;
  let progressMarkup = null;
  if (showVideoProgress) {
    const progressValue = calculateProgress(videoLength, videoProgress);
    const progressValuePercents = Math.round(progressValue * 100);

    /* eslint-disable @shopify/jsx-no-hardcoded-content */
    progressMarkup = /*#__PURE__*/React.createElement("div", {
      className: VideoThumbnail_module.default.Progress
    }, /*#__PURE__*/React.createElement("progress", {
      className: VideoThumbnail_module.default.ProgressBar,
      value: progressValuePercents,
      max: "100"
    }), /*#__PURE__*/React.createElement("div", {
      className: VideoThumbnail_module.default.Indicator,
      style: {
        transform: `scaleX(${progressValue})`
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: VideoThumbnail_module.default.Label
    }, progressValuePercents, "%")));
    /* eslint-enable @shopify/jsx-no-hardcoded-content */
  }
  return /*#__PURE__*/React.createElement("div", {
    className: VideoThumbnail_module.default.ThumbnailContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: VideoThumbnail_module.default.Thumbnail,
    style: {
      backgroundImage: `url(${thumbnailUrl})`
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: VideoThumbnail_module.default.PlayButton,
    "aria-label": buttonLabel,
    onClick: onClick,
    onMouseEnter: onBeforeStartPlaying,
    onFocus: onBeforeStartPlaying,
    onTouchStart: onBeforeStartPlaying
  }, timeStampMarkup), progressMarkup);
}
function calculateProgress(videoLength, videoProgress) {
  if (videoProgress > videoLength && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Value passed to the video progress should not exceed video length. Resetting progress to 100%.');
  }
  if (videoProgress > 0 && videoLength > 0) {
    const progress = parseFloat((videoProgress / videoLength).toFixed(2));
    return progress > 1 ? 1 : progress;
  }
  return 0;
}

exports.VideoThumbnail = VideoThumbnail;
