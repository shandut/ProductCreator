'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var utilities = require('./utilities.js');
var LegacyTabs_module = require('./LegacyTabs.css.js');
var Panel = require('./components/Panel/Panel.js');
var TabMeasurer = require('./components/TabMeasurer/TabMeasurer.js');
var List = require('./components/List/List.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Tab = require('./components/Tab/Tab.js');
var Icon = require('../Icon/Icon.js');
var Box = require('../Box/Box.js');
var Popover = require('../Popover/Popover.js');

class TabsInner extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      disclosureWidth: 0,
      containerWidth: Infinity,
      tabWidths: [],
      visibleTabs: [],
      hiddenTabs: [],
      showDisclosure: false,
      tabToFocus: -1
    };
    this.handleKeyPress = event => {
      const {
        tabToFocus,
        visibleTabs,
        hiddenTabs,
        showDisclosure
      } = this.state;
      const key = event.key;
      const tabsArrayInOrder = showDisclosure ? visibleTabs.concat(hiddenTabs) : [...visibleTabs];
      let newFocus = tabsArrayInOrder.indexOf(tabToFocus);
      if (key === 'ArrowRight') {
        newFocus += 1;
        if (newFocus === tabsArrayInOrder.length) {
          newFocus = 0;
        }
      }
      if (key === 'ArrowLeft') {
        if (newFocus === -1 || newFocus === 0) {
          newFocus = tabsArrayInOrder.length - 1;
        } else {
          newFocus -= 1;
        }
      }
      this.setState({
        tabToFocus: tabsArrayInOrder[newFocus]
      });
    };
    // eslint-disable-next-line @shopify/react-no-multiple-render-methods
    this.renderTabMarkup = (tab, index) => {
      const {
        selected,
        children
      } = this.props;
      const {
        tabToFocus
      } = this.state;
      const tabPanelID = tab.panelID || `${tab.id}-panel`;
      return /*#__PURE__*/React.createElement(Tab.Tab, {
        key: `${index}-${tab.id}`,
        id: tab.id,
        siblingTabHasFocus: tabToFocus > -1,
        focused: index === tabToFocus,
        selected: index === selected,
        onClick: this.handleTabClick,
        panelID: children ? tabPanelID : undefined,
        accessibilityLabel: tab.accessibilityLabel,
        url: tab.url
      }, tab.content);
    };
    this.handleFocus = event => {
      const {
        selected,
        tabs
      } = this.props;

      // If we are explicitly focusing a non-selected tab, this focuses it
      const target = event.target;
      if (target.classList.contains(LegacyTabs_module.default.Tab) || target.classList.contains(LegacyTabs_module.default.Item)) {
        let tabToFocus = -1;
        tabs.every((tab, index) => {
          if (tab.id === target.id) {
            tabToFocus = index;
            return false;
          }
          return true;
        });
        this.setState({
          tabToFocus
        });
        return;
      }
      if (target.classList.contains(LegacyTabs_module.default.DisclosureActivator)) {
        return;
      }

      // If we are coming in from somewhere other than another tab, focus the
      // selected tab, and the focus (click) is not on the disclosure activator,
      // focus the selected tab
      if (!event.relatedTarget) {
        this.setState({
          tabToFocus: selected
        });
        return;
      }
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof HTMLElement && !relatedTarget.classList.contains(LegacyTabs_module.default.Tab) && !relatedTarget.classList.contains(LegacyTabs_module.default.Item) && !relatedTarget.classList.contains(LegacyTabs_module.default.DisclosureActivator)) {
        this.setState({
          tabToFocus: selected
        });
      }
    };
    this.handleBlur = event => {
      // If we blur and the target is not another tab, forget the focus position
      if (event.relatedTarget == null) {
        this.setState({
          tabToFocus: -1
        });
        return;
      }
      const target = event.relatedTarget;

      // If we are going to anywhere other than another tab, lose the last focused tab
      if (target instanceof HTMLElement && !target.classList.contains(LegacyTabs_module.default.Tab) && !target.classList.contains(LegacyTabs_module.default.Item)) {
        this.setState({
          tabToFocus: -1
        });
      }
    };
    this.handleDisclosureActivatorClick = () => {
      this.setState(({
        showDisclosure
      }) => ({
        showDisclosure: !showDisclosure
      }));
    };
    this.handleClose = () => {
      this.setState({
        showDisclosure: false
      });
    };
    this.handleMeasurement = measurements => {
      const {
        tabs,
        selected
      } = this.props;
      const {
        tabToFocus
      } = this.state;
      const {
        hiddenTabWidths: tabWidths,
        containerWidth,
        disclosureWidth
      } = measurements;
      const {
        visibleTabs,
        hiddenTabs
      } = utilities.getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth);
      this.setState({
        tabToFocus: tabToFocus === -1 ? -1 : selected,
        visibleTabs,
        hiddenTabs,
        disclosureWidth,
        containerWidth,
        tabWidths
      });
    };
    this.handleTabClick = id => {
      const {
        tabs,
        onSelect = noop
      } = this.props;
      const tab = tabs.find(aTab => aTab.id === id);
      if (tab == null) {
        return;
      }
      const selectedIndex = tabs.indexOf(tab);
      onSelect(selectedIndex);
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      disclosureWidth,
      tabWidths,
      containerWidth
    } = prevState;
    const {
      visibleTabs,
      hiddenTabs
    } = utilities.getVisibleAndHiddenTabIndices(nextProps.tabs, nextProps.selected, disclosureWidth, tabWidths, containerWidth);
    return {
      visibleTabs,
      hiddenTabs,
      selected: nextProps.selected
    };
  }
  render() {
    const {
      tabs,
      selected,
      fitted,
      children,
      i18n,
      disclosureText
    } = this.props;
    const {
      tabToFocus,
      visibleTabs,
      hiddenTabs,
      showDisclosure
    } = this.state;
    const disclosureTabs = hiddenTabs.map(tabIndex => tabs[tabIndex]);
    const panelMarkup = children ? tabs.map((_tab, index) => {
      return selected === index ? /*#__PURE__*/React.createElement(Panel.Panel, {
        id: tabs[index].panelID || `${tabs[index].id}-panel`,
        tabID: tabs[index].id,
        key: tabs[index].id
      }, children) : /*#__PURE__*/React.createElement(Panel.Panel, {
        id: tabs[index].panelID || `${tabs[index].id}-panel`,
        tabID: tabs[index].id,
        key: tabs[index].id,
        hidden: true
      });
    }) : null;
    const tabsMarkup = visibleTabs.sort((tabA, tabB) => tabA - tabB).map(tabIndex => this.renderTabMarkup(tabs[tabIndex], tabIndex));
    const disclosureActivatorVisible = visibleTabs.length < tabs.length;
    const hasCustomDisclosure = Boolean(disclosureText);
    const classname = css.classNames(LegacyTabs_module.default.LegacyTabs, fitted && LegacyTabs_module.default.fitted, disclosureActivatorVisible && LegacyTabs_module.default.fillSpace);
    const disclosureTabClassName = css.classNames(LegacyTabs_module.default.DisclosureTab, disclosureActivatorVisible && LegacyTabs_module.default['DisclosureTab-visible']);
    const disclosureButtonClassName = css.classNames(LegacyTabs_module.default.DisclosureActivator, hasCustomDisclosure && LegacyTabs_module.default.Tab);
    const disclosureButtonContentWrapperClassName = css.classNames(LegacyTabs_module.default.Title, hasCustomDisclosure && LegacyTabs_module.default.titleWithIcon);
    const disclosureButtonContent = hasCustomDisclosure ? /*#__PURE__*/React.createElement(React.Fragment, null, disclosureText, /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.ChevronDownIcon,
      tone: "subdued"
    })) : /*#__PURE__*/React.createElement(Icon.Icon, {
      source: polarisIcons.MenuHorizontalIcon,
      tone: "subdued"
    });
    const disclosureButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: disclosureButtonClassName,
      onClick: this.handleDisclosureActivatorClick,
      "aria-label": i18n.translate('Polaris.Tabs.toggleTabsLabel')
    }, /*#__PURE__*/React.createElement("span", {
      className: disclosureButtonContentWrapperClassName
    }, disclosureButtonContent));
    const activator = disclosureText ? /*#__PURE__*/React.createElement("div", {
      className: LegacyTabs_module.default.TabContainer
    }, disclosureButton) : disclosureButton;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box.Box, {
      borderBlockEndWidth: "025",
      borderColor: "border-secondary",
      paddingInlineStart: "200",
      paddingInlineEnd: "200"
    }, /*#__PURE__*/React.createElement(TabMeasurer.TabMeasurer, {
      tabToFocus: tabToFocus,
      activator: activator,
      selected: selected,
      tabs: tabs,
      siblingTabHasFocus: tabToFocus > -1,
      handleMeasurement: this.handleMeasurement
    }), /*#__PURE__*/React.createElement("ul", {
      role: "tablist",
      className: classname,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: this.handleKeyPress
    }, tabsMarkup, /*#__PURE__*/React.createElement("li", {
      className: disclosureTabClassName,
      role: "presentation"
    }, /*#__PURE__*/React.createElement(Popover.Popover, {
      preferredPosition: "below",
      activator: activator,
      active: disclosureActivatorVisible && showDisclosure,
      onClose: this.handleClose,
      autofocusTarget: "first-node"
    }, /*#__PURE__*/React.createElement(List.List, {
      focusIndex: hiddenTabs.indexOf(tabToFocus),
      disclosureTabs: disclosureTabs,
      onClick: this.handleTabClick,
      onKeyPress: this.handleKeyPress
    }))))), panelMarkup);
  }
}
function noop() {}
function handleKeyDown(event) {
  const {
    key
  } = event;
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
/** @deprecated Use the Tabs component instead */
function LegacyTabs(props) {
  const i18n = hooks.useI18n();
  return /*#__PURE__*/React.createElement(TabsInner, Object.assign({}, props, {
    i18n: i18n
  }));
}

exports.LegacyTabs = LegacyTabs;
