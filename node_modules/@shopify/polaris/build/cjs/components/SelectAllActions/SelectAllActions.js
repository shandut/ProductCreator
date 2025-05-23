'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../utilities/css.js');
var SelectAllActions_module = require('./SelectAllActions.css.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Text = require('../Text/Text.js');
var Box = require('../Box/Box.js');
var InlineStack = require('../InlineStack/InlineStack.js');
var CheckableButton = require('../CheckableButton/CheckableButton.js');

/**
 * @deprecated Use `BulkActions` instead.
 */
const SelectAllActions = /*#__PURE__*/React.forwardRef(function SelectAllActions({
  label,
  selectMode,
  paginatedSelectAllText,
  paginatedSelectAllAction,
  disabled,
  isSticky,
  hasPagination,
  accessibilityLabel,
  selected,
  onToggleAll
}, ref) {
  const nodeRef = React.useRef(null);
  const paginatedSelectAllMarkup = paginatedSelectAllAction ? /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: SelectAllActions_module.default.AllAction,
    onClick: paginatedSelectAllAction.onAction,
    size: "slim",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, paginatedSelectAllAction.content)) : null;
  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;
  const ariaLive = hasTextAndAction ? 'polite' : undefined;
  const checkableButtonProps = {
    accessibilityLabel,
    label: hasTextAndAction ? paginatedSelectAllText : label,
    selected,
    onToggleAll,
    disabled,
    ariaLive,
    ref
  };
  const checkableButtonMarkup = accessibilityLabel && onToggleAll ? /*#__PURE__*/React.createElement(CheckableButton.CheckableButton, checkableButtonProps) : null;
  const markup = /*#__PURE__*/React.createElement(reactTransitionGroup.Transition, {
    timeout: 0,
    in: selectMode,
    key: "markup",
    nodeRef: nodeRef
  }, status => {
    const wrapperClasses = css.classNames(SelectAllActions_module.default.SelectAllActions, hasPagination && SelectAllActions_module.default['SelectAllActions-hasPagination'], !isSticky && SelectAllActions_module.default['SelectAllActions-not-sticky'], status && SelectAllActions_module.default[`SelectAllActions-${status}`]);
    return /*#__PURE__*/React.createElement("div", {
      className: wrapperClasses,
      ref: nodeRef
    }, /*#__PURE__*/React.createElement(Box.Box, {
      background: "bg-surface-secondary",
      borderBlockStartWidth: "025",
      borderColor: "border",
      width: "100%",
      paddingBlockStart: "300",
      paddingBlockEnd: "300",
      paddingInlineStart: "300",
      paddingInlineEnd: "400"
    }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      gap: "200",
      align: "start",
      blockAlign: "center"
    }, checkableButtonMarkup, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, hasTextAndAction ? paginatedSelectAllText : label), paginatedSelectAllMarkup)));
  });
  return markup;
});

exports.SelectAllActions = SelectAllActions;
