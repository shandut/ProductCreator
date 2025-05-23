import React, { useRef, useEffect } from 'react';
import { classNames } from '../../utilities/css.js';
import { useToggle } from '../../utilities/use-toggle.js';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import styles from './LegacyCard.css.js';
import { Header } from './components/Header/Header.js';
import { Section } from './components/Section/Section.js';
import { Subsection } from './components/Subsection/Subsection.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { buttonFrom } from '../Button/utils.js';
import { Popover } from '../Popover/Popover.js';
import { Button } from '../Button/Button.js';
import { ActionList } from '../ActionList/ActionList.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.
/** @deprecated Use the Card component instead */
const LegacyCard = function LegacyCard({
  children,
  hideOnPrint,
  title,
  subdued,
  sectioned,
  actions,
  primaryFooterAction,
  secondaryFooterActions,
  secondaryFooterActionsDisclosureText,
  footerActionAlignment = 'right'
}) {
  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen
  } = useToggle(false);
  const legacyCard = useLegacyCardPaddingObserverRef();
  const className = classNames(styles.LegacyCard, subdued && styles.subdued, hideOnPrint && styles.hideOnPrint);
  const headerMarkup = title || actions ? /*#__PURE__*/React.createElement(Header, {
    actions: actions,
    title: title
  }) : null;
  const content = sectioned ? /*#__PURE__*/React.createElement(Section, null, children) : children;
  const primaryFooterActionMarkup = primaryFooterAction ? buttonFrom(primaryFooterAction, {
    variant: 'primary'
  }) : null;
  let secondaryFooterActionsMarkup = null;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      secondaryFooterActionsMarkup = buttonFrom(secondaryFooterActions[0]);
    } else {
      secondaryFooterActionsMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popover, {
        active: secondaryActionsPopoverOpen,
        activator: /*#__PURE__*/React.createElement(Button, {
          disclosure: true,
          onClick: toggleSecondaryActionsPopoverOpen
        }, secondaryFooterActionsDisclosureText || i18n.translate('Polaris.Common.more')),
        onClose: toggleSecondaryActionsPopoverOpen
      }, /*#__PURE__*/React.createElement(ActionList, {
        items: secondaryFooterActions
      })));
    }
  }
  const footerMarkup = primaryFooterActionMarkup || secondaryFooterActionsMarkup ? /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.Footer, footerActionAlignment === 'left' && styles.LeftJustified)
  }, footerActionAlignment === 'right' ? /*#__PURE__*/React.createElement(ButtonGroup, null, secondaryFooterActionsMarkup, primaryFooterActionMarkup) : /*#__PURE__*/React.createElement(ButtonGroup, null, primaryFooterActionMarkup, secondaryFooterActionsMarkup)) : null;
  return /*#__PURE__*/React.createElement(WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("div", {
    className: className,
    ref: legacyCard
  }, headerMarkup, content, footerMarkup));
};
LegacyCard.Header = Header;
LegacyCard.Section = Section;
LegacyCard.Subsection = Subsection;

/*
 * Hook to add extra padding on first and last section elements.
 * Replace with css nth-child of when made available on
 * more browser versions https://caniuse.com/css-nth-child-of.
 */
function useLegacyCardPaddingObserverRef() {
  const legacyCard = useRef(null);
  useEffect(() => {
    const legacyCardNode = legacyCard.current;
    let firstSection;
    let lastSection;
    if (legacyCardNode) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);

        // Get current first and last sections, return if they don't exist
        const currentElements = legacyCardNode.querySelectorAll(`.${styles.Section}, .${styles.Header}, .${styles.Footer}`);
        if (!currentElements?.length) return;
        const firstElement = currentElements[0];
        const lastElement = getMostSeniorLastElement(currentElements);

        // Update padding for first element if it is the first child or
        // a descendant of the first child
        if (legacyCardNode.firstChild?.contains(firstElement)) {
          firstSection = firstElement;
          updatePadding(firstSection, 'top', true);
        }

        // Update padding for last element if it is the last child or
        // a descendant of the last child
        if (legacyCardNode.lastChild?.contains(lastElement)) {
          lastSection = lastElement;
          updatePadding(lastSection, 'bottom', true);
        }
      };

      // First initial render
      updateFirstAndLastSectionPadding();

      // Re-run when descendants are changed
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode, {
        childList: true,
        subtree: true
      });
      return () => {
        // Clean up by removing added classes
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);
        observer.disconnect();
      };
    }
  }, []);
  return legacyCard;
}
function updatePadding(element, area, add) {
  if (!element || element.className.includes(styles['Section-flush'])) return;
  switch (area) {
    case 'top':
      element.classList.toggle(styles.FirstSectionPadding, add);
      return;
    case 'bottom':
      element.classList.toggle(styles.LastSectionPadding, add);
  }
}

/*
 * Get the senior most last element in a node list ordered by
 * a depth first traversal.
 * https://www.w3.org/TR/selectors-api/#document-order
 */
function getMostSeniorLastElement(elements) {
  let lastElement = elements[0];
  elements.forEach(element => {
    if (!lastElement.contains(element)) {
      lastElement = element;
    }
  });
  return lastElement;
}

export { LegacyCard };
