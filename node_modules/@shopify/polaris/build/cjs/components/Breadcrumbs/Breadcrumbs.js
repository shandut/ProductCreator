'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var focus = require('../../utilities/focus.js');
var Button = require('../Button/Button.js');

function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  return /*#__PURE__*/React.createElement(Button.Button, {
    key: content,
    url: 'url' in backAction ? backAction.url : undefined,
    onClick: 'onAction' in backAction ? backAction.onAction : undefined,
    onPointerDown: focus.handleMouseUpByBlurring,
    icon: polarisIcons.ArrowLeftIcon,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
}

exports.Breadcrumbs = Breadcrumbs;
