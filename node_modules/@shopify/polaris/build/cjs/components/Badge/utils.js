'use strict';

var types = require('./types.js');

function getDefaultAccessibilityLabel(i18n, progress, tone) {
  let progressLabel = '';
  let toneLabel = '';
  if (!progress && !tone) {
    return '';
  }
  switch (progress) {
    case types.ProgressValue.Incomplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.incomplete');
      break;
    case types.ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.partiallyComplete');
      break;
    case types.ProgressValue.Complete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }
  switch (tone) {
    case types.ToneValue.Info:
    case types.ToneValue.InfoStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.info');
      break;
    case types.ToneValue.Success:
    case types.ToneValue.SuccessStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.success');
      break;
    case types.ToneValue.Warning:
    case types.ToneValue.WarningStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.warning');
      break;
    case types.ToneValue.Critical:
    case types.ToneValue.CriticalStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.critical');
      break;
    case types.ToneValue.Attention:
    case types.ToneValue.AttentionStrong:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.attention');
      break;
    case types.ToneValue.New:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.new');
      break;
    case types.ToneValue.ReadOnly:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.readOnly');
      break;
    case types.ToneValue.Enabled:
      toneLabel = i18n.translate('Polaris.Badge.TONE_LABELS.enabled');
      break;
  }
  if (!tone && progress) {
    return progressLabel;
  } else if (tone && !progress) {
    return toneLabel;
  } else {
    return i18n.translate('Polaris.Badge.progressAndTone', {
      progressLabel,
      toneLabel
    });
  }
}

exports.getDefaultAccessibilityLabel = getDefaultAccessibilityLabel;
