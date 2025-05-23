'use strict';

var polarisIcons = require('@shopify/polaris-icons');
var React = require('react');
var isInputFocused = require('../../utilities/is-input-focused.js');
var css = require('../../utilities/css.js');
var Pagination_module = require('./Pagination.css.js');
var hooks = require('../../utilities/i18n/hooks.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var Box = require('../Box/Box.js');
var InlineStack = require('../InlineStack/InlineStack.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var Tooltip = require('../Tooltip/Tooltip.js');
var Text = require('../Text/Text.js');
var Button = require('../Button/Button.js');

function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label,
  type = 'page'
}) {
  const i18n = hooks.useI18n();
  const node = /*#__PURE__*/React.createRef();
  const navLabel = accessibilityLabel || i18n.translate('Polaris.Pagination.pagination');
  const previousLabel = accessibilityLabels?.previous || i18n.translate('Polaris.Pagination.previous');
  const nextLabel = accessibilityLabels?.next || i18n.translate('Polaris.Pagination.next');
  const prev = /*#__PURE__*/React.createElement(Button.Button, {
    icon: polarisIcons.ChevronLeftIcon,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  });
  const constructedPrevious = previousTooltip && hasPrevious ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev;
  const next = /*#__PURE__*/React.createElement(Button.Button, {
    icon: polarisIcons.ChevronRightIcon,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  });
  const constructedNext = nextTooltip && hasNext ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next;
  const previousHandler = onPrevious || noop;
  const previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    key: key,
    keyCode: key,
    handler: previousURL ? handleCallback(clickPaginationLink('previousURL', node)) : handleCallback(previousHandler)
  }));
  const nextHandler = onNext || noop;
  const nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    key: key,
    keyCode: key,
    handler: nextURL ? handleCallback(clickPaginationLink('nextURL', node)) : handleCallback(nextHandler)
  }));
  if (type === 'table') {
    const labelMarkup = label ? /*#__PURE__*/React.createElement(Box.Box, {
      padding: "300",
      paddingBlockStart: "0",
      paddingBlockEnd: "0"
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, label)) : null;
    return /*#__PURE__*/React.createElement("nav", {
      "aria-label": navLabel,
      ref: node,
      className: css.classNames(Pagination_module.default.Pagination, Pagination_module.default.table)
    }, previousButtonEvents, nextButtonEvents, /*#__PURE__*/React.createElement(Box.Box, {
      background: "bg-surface-secondary",
      paddingBlockStart: "150",
      paddingBlockEnd: "150",
      paddingInlineStart: "300",
      paddingInlineEnd: "200"
    }, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      align: "center",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement("div", {
      className: Pagination_module.default.TablePaginationActions,
      "data-buttongroup-variant": "segmented"
    }, /*#__PURE__*/React.createElement("div", null, constructedPrevious), labelMarkup, /*#__PURE__*/React.createElement("div", null, constructedNext)))));
  }
  const labelTextMarkup = hasNext && hasPrevious ? /*#__PURE__*/React.createElement("span", null, label) : /*#__PURE__*/React.createElement(Text.Text, {
    tone: "subdued",
    as: "span"
  }, label);
  const labelMarkup = label ? /*#__PURE__*/React.createElement(Box.Box, {
    padding: "300",
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: Pagination_module.default.Pagination
  }, previousButtonEvents, nextButtonEvents, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, {
    variant: "segmented"
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null) {
      return;
    }
    const link = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}
function handleCallback(fn) {
  return () => {
    if (isInputFocused.isInputFocused()) {
      return;
    }
    fn();
  };
}
function noop() {}

exports.Pagination = Pagination;
