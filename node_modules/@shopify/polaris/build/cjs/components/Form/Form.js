'use strict';

var React = require('react');
var hooks = require('../../utilities/i18n/hooks.js');
var Text = require('../Text/Text.js');

function Form({
  acceptCharset,
  action,
  autoComplete,
  children,
  encType,
  implicitSubmit = true,
  method = 'post',
  name,
  noValidate,
  preventDefault = true,
  target,
  onSubmit
}) {
  const i18n = hooks.useI18n();
  const handleSubmit = React.useCallback(event => {
    if (!preventDefault) {
      return;
    }
    event.preventDefault();
    onSubmit(event);
  }, [onSubmit, preventDefault]);
  const autoCompleteInputs = normalizeAutoComplete(autoComplete);
  const submitMarkup = implicitSubmit ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    "aria-hidden": "true",
    tabIndex: -1
  }, i18n.translate('Polaris.Common.submit'))) : null;
  return /*#__PURE__*/React.createElement("form", {
    acceptCharset: acceptCharset,
    action: action,
    autoComplete: autoCompleteInputs,
    encType: encType,
    method: method,
    name: name,
    noValidate: noValidate,
    target: target,
    onSubmit: handleSubmit
  }, submitMarkup, children);
}
function normalizeAutoComplete(autoComplete) {
  if (autoComplete == null) {
    return autoComplete;
  }
  return autoComplete ? 'on' : 'off';
}

exports.Form = Form;
