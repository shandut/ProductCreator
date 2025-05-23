import { themeNameDefault } from '@shopify/polaris-tokens';
import React, { useId, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeName } from '../../utilities/use-theme.js';
import { usePortalsManager } from '../../utilities/portals/hooks.js';
import { ThemeProvider, isThemeNameLocal } from '../ThemeProvider/ThemeProvider.js';

function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop
}) {
  const themeName = useThemeName();
  const {
    container
  } = usePortalsManager();
  const uniqueId = useId();
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;
  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);
  return container ? /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(ThemeProvider, {
    theme: isThemeNameLocal(themeName) ? themeName : themeNameDefault,
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop() {}

export { Portal };
