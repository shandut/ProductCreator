import React from 'react';
import styles from './Message.css.js';
import { Link } from '../../../../../Link/Link.js';
import { Badge } from '../../../../../Badge/Badge.js';
import { Popover } from '../../../../../Popover/Popover.js';
import { LegacyStack } from '../../../../../LegacyStack/LegacyStack.js';
import { TextContainer } from '../../../../../TextContainer/TextContainer.js';
import { Text } from '../../../../../Text/Text.js';
import { Button } from '../../../../../Button/Button.js';

function Message({
  title,
  description,
  action,
  link,
  badge
}) {
  const badgeMarkup = badge && /*#__PURE__*/React.createElement(Badge, {
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
    className: styles.Section
  }, /*#__PURE__*/React.createElement(Popover.Section, null, /*#__PURE__*/React.createElement(LegacyStack, {
    vertical: true,
    spacing: "tight"
  }, /*#__PURE__*/React.createElement(TextContainer, null, /*#__PURE__*/React.createElement(Text, {
    variant: "headingMd",
    as: "h2"
  }, title, badgeMarkup), /*#__PURE__*/React.createElement("p", null, description)), /*#__PURE__*/React.createElement(Link, {
    url: to
  }, linkContent), /*#__PURE__*/React.createElement(Button, {
    variant: "plain",
    onClick: onClick
  }, actionContent))));
}

export { Message };
