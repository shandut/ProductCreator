'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var context = require('../../../../utilities/listbox/context.js');
var Option_module = require('./Option.css.js');
var hooks = require('../../../../utilities/listbox/hooks.js');
var context$1 = require('../../../../utilities/autocomplete/context.js');
var hooks$1 = require('../Section/hooks.js');
var selectors = require('../Section/selectors.js');
var TextOption = require('../TextOption/TextOption.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');

const Option = /*#__PURE__*/React.memo(function Option({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider
}) {
  const {
    onOptionSelect
  } = hooks.useListbox();
  const isAction = React.useContext(context.ActionContext);
  const {
    role,
    url,
    external,
    onAction,
    destructive
  } = React.useContext(context$1.MappedActionContext);
  const listItemRef = React.useRef(null);
  const domId = React.useId();
  const sectionId = hooks$1.useSection();
  const isWithinSection = Boolean(sectionId);
  const handleOptionSelect = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    onAction && onAction();
    if (listItemRef.current && !onAction) {
      onOptionSelect({
        domId,
        value,
        element: listItemRef.current,
        disabled
      });
    }
  }, [domId, onOptionSelect, value, disabled, onAction]);

  // prevents lost of focus on Textfield
  const handleMouseDown = event => {
    event.preventDefault();
  };
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(TextOption.TextOption, {
    selected: selected,
    disabled: disabled
  }, children) : children;
  const sectionAttributes = {
    [selectors.listboxWithinSectionDataSelector.attribute]: isWithinSection
  };
  const legacyRoleSupport = role || 'option';
  const contentMarkup = url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
    url: url,
    external: external
  }, content) : content;
  return /*#__PURE__*/React.createElement("li", Object.assign({}, sectionAttributes, {
    "data-listbox-option": true,
    "data-listbox-option-action": isAction,
    "data-listbox-option-value": value,
    "data-listbox-option-destructive": destructive,
    "data-within-section": isWithinSection,
    className: css.classNames(Option_module.default.Option, divider && Option_module.default.divider),
    id: domId,
    ref: listItemRef,
    tabIndex: -1,
    role: legacyRoleSupport,
    "aria-label": accessibilityLabel,
    "aria-selected": selected,
    "aria-disabled": disabled,
    onClick: disabled ? undefined : handleOptionSelect,
    onKeyDown: disabled ? undefined : handleOptionSelect,
    onMouseDown: handleMouseDown
  }), contentMarkup);
});

exports.Option = Option;
