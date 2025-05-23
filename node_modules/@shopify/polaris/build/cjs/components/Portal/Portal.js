'use strict';

var polarisTokens = require('@shopify/polaris-tokens');
var React = require('react');
var reactDom = require('react-dom');
var useTheme = require('../../utilities/use-theme.js');
var hooks = require('../../utilities/portals/hooks.js');
var ThemeProvider = require('../ThemeProvider/ThemeProvider.js');

function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop
}) {
  const themeName = useTheme.useThemeName();
  const {
    container
  } = hooks.usePortalsManager();
  const uniqueId = React.useId();
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;
  React.useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);
  return container ? /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React.createElement(ThemeProvider.ThemeProvider, {
    theme: ThemeProvider.isThemeNameLocal(themeName) ? themeName : polarisTokens.themeNameDefault,
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop() {}

exports.Portal = Portal;
