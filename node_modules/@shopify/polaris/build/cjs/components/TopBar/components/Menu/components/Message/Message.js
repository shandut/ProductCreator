'use strict';

var React = require('react');
var Message_module = require('./Message.css.js');
var Link = require('../../../../../Link/Link.js');
var Badge = require('../../../../../Badge/Badge.js');
var Popover = require('../../../../../Popover/Popover.js');
var LegacyStack = require('../../../../../LegacyStack/LegacyStack.js');
var TextContainer = require('../../../../../TextContainer/TextContainer.js');
var Text = require('../../../../../Text/Text.js');
var Button = require('../../../../../Button/Button.js');

function Message({
  title,
  description,
  action,
  link,
  badge
}) {
  const badgeMarkup = badge && /*#__PURE__*/React.createElement(Badge.Badge, {
    tone: badge.tone
  }, badge.content);
  const {
    to,
    content: linkContent
  } = link;
  const {
    onClick,
    content: actionContent
  } = action;
  return /*#__PURE__*/React.createElement("div", {
    className: Message_module.default.Section
  }, /*#__PURE__*/React.createElement(Popover.Popover.Section, null, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    vertical: true,
    spacing: "tight"
  }, /*#__PURE__*/React.createElement(TextContainer.TextContainer, null, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingMd",
    as: "h2"
  }, title, badgeMarkup), /*#__PURE__*/React.createElement("p", null, description)), /*#__PURE__*/React.createElement(Link.Link, {
    url: to
  }, linkContent), /*#__PURE__*/React.createElement(Button.Button, {
    variant: "plain",
    onClick: onClick
  }, actionContent))));
}

exports.Message = Message;
