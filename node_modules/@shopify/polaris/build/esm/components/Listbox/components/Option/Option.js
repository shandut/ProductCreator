import React, { memo, useContext, useRef, useId, useCallback } from 'react';
import { classNames } from '../../../../utilities/css.js';
import { ActionContext } from '../../../../utilities/listbox/context.js';
import styles from './Option.css.js';
import { useListbox } from '../../../../utilities/listbox/hooks.js';
import { MappedActionContext } from '../../../../utilities/autocomplete/context.js';
import { useSection } from '../Section/hooks.js';
import { listboxWithinSectionDataSelector } from '../Section/selectors.js';
import { TextOption } from '../TextOption/TextOption.js';
import { UnstyledLink } from '../../../UnstyledLink/UnstyledLink.js';

const Option = /*#__PURE__*/memo(function Option({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider
}) {
  const {
    onOptionSelect
  } = useListbox();
  const isAction = useContext(ActionContext);
  const {
    role,
    url,
    external,
    onAction,
    destructive
  } = useContext(MappedActionContext);
  const listItemRef = useRef(null);
  const domId = useId();
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);
  const handleOptionSelect = useCallback(event => {
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
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(TextOption, {
    selected: selected,
    disabled: disabled
  }, children) : children;
  const sectionAttributes = {
    [listboxWithinSectionDataSelector.attribute]: isWithinSection
  };
  const legacyRoleSupport = role || 'option';
  const contentMarkup = url ? /*#__PURE__*/React.createElement(UnstyledLink, {
    url: url,
    external: external
  }, content) : content;
  return /*#__PURE__*/React.createElement("li", Object.assign({}, sectionAttributes, {
    "data-listbox-option": true,
    "data-listbox-option-action": isAction,
    "data-listbox-option-value": value,
    "data-listbox-option-destructive": destructive,
    "data-within-section": isWithinSection,
    className: classNames(styles.Option, divider && styles.divider),
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

export { Option };
