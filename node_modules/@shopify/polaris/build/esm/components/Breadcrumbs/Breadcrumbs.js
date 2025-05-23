import React from 'react';
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import { handleMouseUpByBlurring } from '../../utilities/focus.js';
import { Button } from '../Button/Button.js';

function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  return /*#__PURE__*/React.createElement(Button, {
    key: content,
    url: 'url' in backAction ? backAction.url : undefined,
    onClick: 'onAction' in backAction ? backAction.onAction : undefined,
    onPointerDown: handleMouseUpByBlurring,
    icon: ArrowLeftIcon,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
}

export { Breadcrumbs };
