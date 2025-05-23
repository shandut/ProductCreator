'use strict';

var React = require('react');
var errors = require('../errors.js');
var context = require('./context.js');

function useI18n() {
  const i18n = React.useContext(context.I18nContext);
  if (!i18n) {
    throw new errors.MissingAppProviderError('No i18n was provided.');
  }
  return i18n;
}

exports.useI18n = useI18n;
