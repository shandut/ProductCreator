'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var LegacyCard_module = require('../../LegacyCard.css.js');
var LegacyStack = require('../../../LegacyStack/LegacyStack.js');
var ButtonGroup = require('../../../ButtonGroup/ButtonGroup.js');
var utils = require('../../../Button/utils.js');
var Text = require('../../../Text/Text.js');

function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint
}) {
  const className = css.classNames(LegacyCard_module.default.Section, flush && LegacyCard_module.default['Section-flush'], subdued && LegacyCard_module.default['Section-subdued'], fullWidth && LegacyCard_module.default['Section-fullWidth'], hideOnPrint && LegacyCard_module.default['Section-hideOnPrint']);
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(actions, {
    variant: 'plain'
  })) : null;
  const titleMarkup = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingSm",
    as: "h3",
    fontWeight: "medium"
  }, title) : title;
  const titleAreaMarkup = titleMarkup || actionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: LegacyCard_module.default.SectionHeader
  }, actionMarkup ? /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup) : titleMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, titleAreaMarkup, children);
}

exports.Section = Section;
