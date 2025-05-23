'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var DataTable_module = require('../../DataTable.css.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Button = require('../../../Button/Button.js');

function Navigation({
  columnVisibilityData,
  isScrolledFarthestLeft,
  isScrolledFarthestRight,
  navigateTableLeft,
  navigateTableRight,
  fixedFirstColumns,
  setRef = () => {}
}) {
  const i18n = hooks.useI18n();
  const pipMarkup = columnVisibilityData.map((column, index) => {
    if (index < fixedFirstColumns) return;
    const className = css.classNames(DataTable_module.default.Pip, column.isVisible && DataTable_module.default['Pip-visible']);
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      key: `pip-${index}`
    });
  });
  const leftA11yLabel = i18n.translate('Polaris.DataTable.navAccessibilityLabel', {
    direction: 'left'
  });
  const rightA11yLabel = i18n.translate('Polaris.DataTable.navAccessibilityLabel', {
    direction: 'right'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: DataTable_module.default.Navigation,
    ref: setRef
  }, /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    icon: polarisIcons.ChevronLeftIcon,
    disabled: isScrolledFarthestLeft,
    accessibilityLabel: leftA11yLabel,
    onClick: navigateTableLeft
  }), pipMarkup, /*#__PURE__*/React.createElement(Button.Button, {
    variant: "tertiary",
    icon: polarisIcons.ChevronRightIcon,
    disabled: isScrolledFarthestRight,
    accessibilityLabel: rightA11yLabel,
    onClick: navigateTableRight
  }));
}

exports.Navigation = Navigation;
