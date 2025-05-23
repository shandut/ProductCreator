'use strict';

var React = require('react');
var Item = require('../Item/Item.js');
var Box = require('../../../Box/Box.js');
var InlineStack = require('../../../InlineStack/InlineStack.js');
var Text = require('../../../Text/Text.js');
var BlockStack = require('../../../BlockStack/BlockStack.js');

function Section({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  const handleAction = itemOnAction => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }
      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };
  const actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    const itemMarkup = /*#__PURE__*/React.createElement(Item.Item, Object.assign({
      content: content,
      helpText: helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item));
    return /*#__PURE__*/React.createElement(Box.Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === 'menuitem' ? 'presentation' : undefined
    }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      wrap: false
    }, itemMarkup));
  });
  let titleMarkup = null;
  if (section.title) {
    titleMarkup = typeof section.title === 'string' ? /*#__PURE__*/React.createElement(Box.Box, {
      paddingBlockStart: "300",
      paddingBlockEnd: "100",
      paddingInlineStart: "300",
      paddingInlineEnd: "300"
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "p",
      variant: "headingSm"
    }, section.title)) : /*#__PURE__*/React.createElement(Box.Box, {
      padding: "200",
      paddingInlineEnd: "150"
    }, section.title);
  }
  let sectionRole;
  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = !hasMultipleSections ? 'menu' : 'presentation';
      break;
    default:
      sectionRole = undefined;
      break;
  }
  const sectionMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, titleMarkup, /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    as: "div",
    padding: "150"
  }, hasMultipleSections && {
    paddingBlockStart: '0'
  }, {
    tabIndex: !hasMultipleSections ? -1 : undefined
  }), /*#__PURE__*/React.createElement(BlockStack.BlockStack, Object.assign({
    gap: "050",
    as: "ul"
  }, sectionRole && {
    role: sectionRole
  }), actionMarkup)));
  return hasMultipleSections ? /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-secondary"
  }, !isFirst && {
    borderBlockStartWidth: '025'
  }, !section.title && {
    paddingBlockStart: '150'
  }), sectionMarkup) : sectionMarkup;
}

exports.Section = Section;
