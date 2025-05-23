'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var MappedOption_module = require('./MappedOption.css.js');
var Listbox = require('../../../Listbox/Listbox.js');

const MappedOption = /*#__PURE__*/React.memo(function MappedOption({
  label,
  value,
  disabled,
  media,
  selected,
  singleSelection
}) {
  const mediaClassNames = css.classNames(MappedOption_module.default.Media, disabled && MappedOption_module.default.disabledMedia, singleSelection && MappedOption_module.default.singleSelectionMedia);
  const mediaMarkup = media ? /*#__PURE__*/React.createElement("div", {
    className: mediaClassNames
  }, media) : null;
  const accessibilityLabel = typeof label === 'string' ? label : undefined;
  return /*#__PURE__*/React.createElement(Listbox.Listbox.Option, {
    accessibilityLabel: accessibilityLabel,
    key: value,
    selected: selected,
    value: value,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Listbox.Listbox.TextOption, {
    selected: selected,
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: MappedOption_module.default.Content
  }, mediaMarkup, label)));
});

exports.MappedOption = MappedOption;
