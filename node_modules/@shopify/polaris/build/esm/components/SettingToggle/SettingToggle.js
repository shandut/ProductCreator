import React, { useId } from 'react';
import { buttonFrom } from '../Button/utils.js';
import { LegacyCard } from '../LegacyCard/LegacyCard.js';
import { SettingAction } from '../SettingAction/SettingAction.js';

/**
 * @deprecated The SettingToggle component will be removed in v12
 * See the "With primitive components" example to learn how to compose
 * setting toggles with layout and typography primitives.
 * https://polaris.shopify.com/components/deprecated/setting-toggle
 */
function SettingToggle({
  enabled,
  action,
  children
}) {
  const id = useId();
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(`Deprecation: <SettingToggle /> is deprecated. This component will be removed in a future major version of Polaris. Use the primitive layout and typography components to compose a setting toggle card.
      See the "With primitive components" example in https://polaris.shopify.com/components/deprecated/setting-toggle`);
  }
  const actionMarkup = action ? buttonFrom(action, {
    role: 'switch',
    ariaChecked: enabled ? 'true' : 'false',
    size: 'slim'
  }) : null;
  return /*#__PURE__*/React.createElement(LegacyCard, {
    sectioned: true
  }, /*#__PURE__*/React.createElement(SettingAction, {
    action: actionMarkup
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, children)));
}

export { SettingToggle };
