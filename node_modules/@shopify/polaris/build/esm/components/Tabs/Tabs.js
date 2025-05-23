import React, { useRef, useReducer, useEffect, useCallback } from 'react';
import { ChevronDownIcon, PlusIcon } from '@shopify/polaris-icons';
import { classNames } from '../../utilities/css.js';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { usePrevious } from '../../utilities/use-previous.js';
import { getVisibleAndHiddenTabIndices } from './utilities.js';
import styles from './Tabs.css.js';
import { Tab } from './components/Tab/Tab.js';
import { Panel } from './components/Panel/Panel.js';
import { List } from './components/List/List.js';
import { CreateViewModal } from './components/CreateViewModal/CreateViewModal.js';
import { TabMeasurer } from './components/TabMeasurer/TabMeasurer.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Icon } from '../Icon/Icon.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';
import { Box } from '../Box/Box.js';
import { Popover } from '../Popover/Popover.js';
import { Tooltip } from '../Tooltip/Tooltip.js';

const CREATE_NEW_VIEW_ID = 'create-new-view';
const Tabs = ({
  tabs,
  children,
  selected,
  newViewAccessibilityLabel,
  canCreateNewView,
  disabled,
  onCreateNewView,
  onSelect,
  fitted,
  disclosureText,
  disclosureZIndexOverride
}) => {
  const i18n = useI18n();
  const {
    mdDown
  } = useBreakpoints();
  const scrollRef = useRef(null);
  const wrapRef = useRef(null);
  const selectedTabRef = useRef(null);
  const [state, setState] = useReducer((data, partialData) => {
    return {
      ...data,
      ...partialData
    };
  }, {
    disclosureWidth: 0,
    containerWidth: Infinity,
    tabWidths: [],
    visibleTabs: [],
    hiddenTabs: [],
    showDisclosure: false,
    tabToFocus: -1,
    isNewViewModalActive: false,
    modalSubmitted: false,
    isTabsFocused: false,
    isTabPopoverOpen: false,
    isTabModalOpen: false
  });
  const {
    tabToFocus,
    visibleTabs,
    hiddenTabs,
    showDisclosure,
    isNewViewModalActive,
    modalSubmitted,
    disclosureWidth,
    tabWidths,
    containerWidth,
    isTabsFocused,
    isTabModalOpen,
    isTabPopoverOpen
  } = state;
  const prevModalOpen = usePrevious(isTabModalOpen);
  const prevPopoverOpen = usePrevious(isTabPopoverOpen);
  useEffect(() => {
    const hasModalClosed = prevModalOpen && !isTabModalOpen;
    const hasPopoverClosed = prevPopoverOpen && !isTabPopoverOpen;
    if (hasModalClosed) {
      setState({
        isTabsFocused: true,
        tabToFocus: selected
      });
    } else if (hasPopoverClosed && !isTabModalOpen) {
      setState({
        isTabsFocused: true,
        tabToFocus: selected
      });
    }
  }, [prevPopoverOpen, isTabPopoverOpen, prevModalOpen, isTabModalOpen, selected, tabToFocus]);
  const handleTogglePopover = useCallback(isOpen => setState({
    isTabPopoverOpen: isOpen
  }), []);
  const handleToggleModal = useCallback(isOpen => setState({
    isTabModalOpen: isOpen
  }), []);
  const handleCloseNewViewModal = () => {
    setState({
      isNewViewModalActive: false
    });
  };
  const handleSaveNewViewModal = async value => {
    if (!onCreateNewView) {
      return false;
    }
    const hasExecuted = await onCreateNewView?.(value);
    if (hasExecuted) {
      setState({
        modalSubmitted: true
      });
    }
    return hasExecuted;
  };
  const handleClickNewTab = () => {
    setState({
      isNewViewModalActive: true
    });
  };
  const handleTabClick = useCallback(id => {
    const tab = tabs.find(aTab => aTab.id === id);
    if (tab == null) {
      return null;
    }
    const selectedIndex = tabs.indexOf(tab);
    onSelect?.(selectedIndex);
  }, [tabs, onSelect]);
  const renderTabMarkup = useCallback((tab, index) => {
    const handleClick = () => {
      handleTabClick(tab.id);
      tab.onAction?.();
    };
    const viewNames = tabs.map(({
      content
    }) => content);
    const tabPanelID = tab.panelID || `${tab.id}-panel`;
    return /*#__PURE__*/React.createElement(Tab, Object.assign({}, tab, {
      key: `${index}-${tab.id}`,
      id: tab.id,
      panelID: children ? tabPanelID : undefined,
      disabled: disabled || tab.disabled,
      siblingTabHasFocus: tabToFocus > -1,
      focused: index === tabToFocus,
      selected: index === selected,
      onAction: handleClick,
      accessibilityLabel: tab.accessibilityLabel,
      url: tab.url,
      content: tab.content,
      onToggleModal: handleToggleModal,
      onTogglePopover: handleTogglePopover,
      viewNames: viewNames,
      disclosureZIndexOverride: disclosureZIndexOverride,
      ref: index === selected ? selectedTabRef : null
    }));
  }, [disabled, tabs, children, selected, tabToFocus, disclosureZIndexOverride, handleTabClick, handleToggleModal, handleTogglePopover]);
  const handleFocus = useCallback(event => {
    const target = event.target;
    const isItem = target.classList.contains(styles.Item);
    const isInNaturalDOMOrder = target.closest(`[data-tabs-focus-catchment]`) || isItem;
    const isDisclosureActivator = target.classList.contains(styles.DisclosureActivator);
    if (isDisclosureActivator || !isInNaturalDOMOrder) {
      return;
    }
    setState({
      isTabsFocused: true
    });
  }, []);
  const handleBlur = useCallback(event => {
    const target = event.target;
    const relatedTarget = event.relatedTarget;
    const isInNaturalDOMOrder = relatedTarget?.closest?.(`.${styles.Tabs}`);
    const targetIsATab = target?.classList?.contains?.(styles.Tab);
    const focusReceiverIsAnItem = relatedTarget?.classList.contains(styles.Item);
    if (!relatedTarget && !isTabModalOpen && !targetIsATab && !focusReceiverIsAnItem) {
      setState({
        tabToFocus: -1
      });
      return;
    }
    if (!isInNaturalDOMOrder && !isTabModalOpen && !targetIsATab && !focusReceiverIsAnItem) {
      setState({
        tabToFocus: -1
      });
      return;
    }
    setState({
      isTabsFocused: false
    });
  }, [isTabModalOpen]);
  const handleKeyDown = event => {
    if (isTabPopoverOpen || isTabModalOpen || isNewViewModalActive) {
      return;
    }
    const {
      key
    } = event;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  useEffect(() => {
    const {
      visibleTabs,
      hiddenTabs
    } = getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth);
    setState({
      visibleTabs,
      hiddenTabs
    });
  }, [containerWidth, disclosureWidth, tabs, selected, tabWidths, setState]);
  const moveToSelectedTab = useCallback(() => {
    const activeButton = selectedTabRef.current?.querySelector(`.${styles['Tab-active']}`);
    if (activeButton) {
      moveToActiveTab(activeButton.offsetLeft);
    }
  }, []);
  useEffect(() => {
    if (mdDown) {
      moveToSelectedTab();
    }
  }, [moveToSelectedTab, selected, mdDown]);
  useEffect(() => {
    if (isTabsFocused && !showDisclosure) {
      const tabToFocus = selected;
      setState({
        tabToFocus
      });
    }
  }, [isTabsFocused, selected, setState, showDisclosure]);
  const handleKeyPress = event => {
    const {
      showDisclosure,
      visibleTabs,
      hiddenTabs,
      tabToFocus,
      isNewViewModalActive
    } = state;
    if (isTabModalOpen || isTabPopoverOpen || isNewViewModalActive) {
      return;
    }
    const key = event.key;
    const tabsArrayInOrder = showDisclosure || mdDown ? visibleTabs.concat(hiddenTabs) : [...visibleTabs];
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
    const buttonToFocus = tabsArrayInOrder[newFocus];
    if (buttonToFocus != null) {
      setState({
        tabToFocus: buttonToFocus
      });
    }
  };
  const handleDisclosureActivatorClick = () => {
    setState({
      showDisclosure: !showDisclosure,
      tabToFocus: hiddenTabs[0]
    });
  };
  const handleClose = () => {
    setState({
      showDisclosure: false
    });
  };
  const handleMeasurement = useCallback(measurements => {
    const {
      hiddenTabWidths: tabWidths,
      containerWidth,
      disclosureWidth
    } = measurements;
    const {
      visibleTabs,
      hiddenTabs
    } = getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth);
    setState({
      visibleTabs,
      hiddenTabs,
      disclosureWidth,
      containerWidth,
      tabWidths
    });
  }, [tabs, selected, setState]);
  const handleListTabClick = id => {
    handleTabClick(id);
    handleClose();
    setState({
      isTabsFocused: true
    });
  };
  const moveToActiveTab = offsetLeft => {
    setTimeout(() => {
      if (scrollRef.current && typeof scrollRef.current.scroll === 'function') {
        const scrollRefOffset = wrapRef?.current?.offsetLeft || 0;
        scrollRef?.current?.scroll({
          left: offsetLeft - scrollRefOffset
        });
      }
    }, 0);
  };
  const createViewA11yLabel = newViewAccessibilityLabel || i18n.translate('Polaris.Tabs.newViewAccessibilityLabel');
  const tabsToShow = mdDown ? [...visibleTabs, ...hiddenTabs] : visibleTabs;
  const tabsMarkup = tabsToShow.sort((tabA, tabB) => tabA - tabB).filter(tabIndex => tabs[tabIndex]).map(tabIndex => renderTabMarkup(tabs[tabIndex], tabIndex));
  const disclosureActivatorVisible = visibleTabs.length < tabs.length && !mdDown;
  const classname = classNames(styles.Tabs, fitted && styles.fitted, disclosureActivatorVisible && styles.fillSpace);
  const wrapperClassNames = classNames(styles.Wrapper, canCreateNewView && styles.WrapperWithNewButton);
  const disclosureTabClassName = classNames(styles.DisclosureTab, disclosureActivatorVisible && styles['DisclosureTab-visible']);
  const disclosureButtonClassName = classNames(styles.DisclosureActivator);
  const disclosureButtonContent = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: "medium"
  }, disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel')), /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.IconWrap, disclosureActivatorVisible && showDisclosure && styles['IconWrap-open'])
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ChevronDownIcon,
    tone: "subdued"
  })));
  const disclosureButton = /*#__PURE__*/React.createElement(UnstyledButton, {
    type: "button",
    className: disclosureButtonClassName,
    onClick: handleDisclosureActivatorClick,
    "aria-label": disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel'),
    disabled: disabled
  }, disclosureButtonContent);
  const activator = disclosureButton;
  const disclosureTabs = hiddenTabs.map(tabIndex => tabs[tabIndex]);
  const viewNames = tabs.map(({
    content
  }) => content);
  const tabMeasurer = /*#__PURE__*/React.createElement(TabMeasurer, {
    tabToFocus: tabToFocus,
    activator: activator,
    selected: selected,
    tabs: tabs,
    siblingTabHasFocus: tabToFocus > -1,
    handleMeasurement: handleMeasurement
  });
  const newTab = /*#__PURE__*/React.createElement(Tab, {
    id: CREATE_NEW_VIEW_ID,
    content: createViewA11yLabel,
    actions: [],
    onAction: handleClickNewTab,
    onFocus: () => {
      if (modalSubmitted) {
        setState({
          tabToFocus: selected,
          modalSubmitted: false
        });
      }
    },
    icon: /*#__PURE__*/React.createElement(Icon, {
      source: PlusIcon,
      accessibilityLabel: createViewA11yLabel
    }),
    disabled: disabled,
    onTogglePopover: handleTogglePopover,
    onToggleModal: handleToggleModal,
    tabIndexOverride: 0
  });
  const panelMarkup = children ? tabs.map((_tab, index) => {
    return selected === index ? /*#__PURE__*/React.createElement(Panel, {
      id: tabs[index].panelID || `${tabs[index].id}-panel`,
      tabID: tabs[index].id,
      key: tabs[index].id
    }, children) : /*#__PURE__*/React.createElement(Panel, {
      id: tabs[index].panelID || `${tabs[index].id}-panel`,
      tabID: tabs[index].id,
      key: tabs[index].id,
      hidden: true
    });
  }) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Outer
  }, /*#__PURE__*/React.createElement(Box, {
    padding: {
      md: '200'
    }
  }, tabMeasurer, /*#__PURE__*/React.createElement("div", {
    className: wrapperClassNames,
    ref: scrollRef
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.ButtonWrapper,
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("ul", {
    role: tabsMarkup.length > 0 ? 'tablist' : undefined,
    className: classname,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyPress,
    "data-tabs-focus-catchment": true
  }, tabsMarkup, mdDown || tabsToShow.length === 0 ? null : /*#__PURE__*/React.createElement("li", {
    className: disclosureTabClassName,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(Popover, {
    preferredPosition: "below",
    preferredAlignment: "left",
    activator: activator,
    active: disclosureActivatorVisible && showDisclosure,
    onClose: handleClose,
    autofocusTarget: "first-node",
    zIndexOverride: disclosureZIndexOverride
  }, /*#__PURE__*/React.createElement(List, {
    focusIndex: hiddenTabs.indexOf(tabToFocus),
    disclosureTabs: disclosureTabs,
    onClick: handleListTabClick,
    onKeyPress: handleKeyPress
  })))), canCreateNewView && tabsToShow.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.NewTab
  }, /*#__PURE__*/React.createElement(CreateViewModal, {
    open: isNewViewModalActive,
    onClose: handleCloseNewViewModal,
    onClickPrimaryAction: handleSaveNewViewModal,
    viewNames: viewNames,
    activator: disabled ? newTab : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tooltip, {
      content: i18n.translate('Polaris.Tabs.newViewTooltip'),
      preferredPosition: "above",
      hoverDelay: 400,
      zIndexOverride: disclosureZIndexOverride
    }, newTab))
  })) : null))), panelMarkup);
};

export { Tabs };
