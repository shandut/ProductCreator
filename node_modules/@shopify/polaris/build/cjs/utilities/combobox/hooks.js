'use strict';

var React = require('react');
var context = require('./context.js');

function useComboboxTextField() {
  const context$1 = React.useContext(context.ComboboxTextFieldContext);
  if (!context$1) {
    throw new Error('No Combobox was provided. Your component must be wrapped in a <Combobox> component.');
  }
  return context$1;
}
function useComboboxListbox() {
  const context$1 = React.useContext(context.ComboboxListboxContext);
  return context$1;
}

exports.useComboboxListbox = useComboboxListbox;
exports.useComboboxTextField = useComboboxTextField;
