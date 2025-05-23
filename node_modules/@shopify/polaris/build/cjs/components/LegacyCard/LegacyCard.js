'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var useToggle = require('../../utilities/use-toggle.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var LegacyCard_module = require('./LegacyCard.css.js');
var Header = require('./components/Header/Header.js');
var Section = require('./components/Section/Section.js');
var Subsection = require('./components/Subsection/Subsection.js');
var hooks = require('../../utilities/i18n/hooks.js');
var utils = require('../Button/utils.js');
var Popover = require('../Popover/Popover.js');
var Button = require('../Button/Button.js');
var ActionList = require('../ActionList/ActionList.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');

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
  const i18n = hooks.useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen
  } = useToggle.useToggle(false);
  const legacyCard = useLegacyCardPaddingObserverRef();
  const className = css.classNames(LegacyCard_module.default.LegacyCard, subdued && LegacyCard_module.default.subdued, hideOnPrint && LegacyCard_module.default.hideOnPrint);
  const headerMarkup = title || actions ? /*#__PURE__*/React.createElement(Header.Header, {
    actions: actions,
    title: title
  }) : null;
  const content = sectioned ? /*#__PURE__*/React.createElement(Section.Section, null, children) : children;
  const primaryFooterActionMarkup = primaryFooterAction ? utils.buttonFrom(primaryFooterAction, {
    variant: 'primary'
  }) : null;
  let secondaryFooterActionsMarkup = null;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      secondaryFooterActionsMarkup = utils.buttonFrom(secondaryFooterActions[0]);
    } else {
      secondaryFooterActionsMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popover.Popover, {
        active: secondaryActionsPopoverOpen,
        activator: /*#__PURE__*/React.createElement(Button.Button, {
          disclosure: true,
          onClick: toggleSecondaryActionsPopoverOpen
        }, secondaryFooterActionsDisclosureText || i18n.translate('Polaris.Common.more')),
        onClose: toggleSecondaryActionsPopoverOpen
      }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
        items: secondaryFooterActions
      })));
    }
  }
  const footerMarkup = primaryFooterActionMarkup || secondaryFooterActionsMarkup ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(LegacyCard_module.default.Footer, footerActionAlignment === 'left' && LegacyCard_module.default.LeftJustified)
  }, footerActionAlignment === 'right' ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, secondaryFooterActionsMarkup, primaryFooterActionMarkup) : /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, primaryFooterActionMarkup, secondaryFooterActionsMarkup)) : null;
  return /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("div", {
    className: className,
    ref: legacyCard
  }, headerMarkup, content, footerMarkup));
};
LegacyCard.Header = Header.Header;
LegacyCard.Section = Section.Section;
LegacyCard.Subsection = Subsection.Subsection;

/*
 * Hook to add extra padding on first and last section elements.
 * Replace with css nth-child of when made available on
 * more browser versions https://caniuse.com/css-nth-child-of.
 */
function useLegacyCardPaddingObserverRef() {
  const legacyCard = React.useRef(null);
  React.useEffect(() => {
    const legacyCardNode = legacyCard.current;
    let firstSection;
    let lastSection;
    if (legacyCardNode) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);

        // Get current first and last sections, return if they don't exist
        const currentElements = legacyCardNode.querySelectorAll(`.${LegacyCard_module.default.Section}, .${LegacyCard_module.default.Header}, .${LegacyCard_module.default.Footer}`);
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
  if (!element || element.className.includes(LegacyCard_module.default['Section-flush'])) return;
  switch (area) {
    case 'top':
      element.classList.toggle(LegacyCard_module.default.FirstSectionPadding, add);
      return;
    case 'bottom':
      element.classList.toggle(LegacyCard_module.default.LastSectionPadding, add);
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

exports.LegacyCard = LegacyCard;
