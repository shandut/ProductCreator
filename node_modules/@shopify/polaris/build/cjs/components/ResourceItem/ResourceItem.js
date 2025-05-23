'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var isEqual = require('react-fast-compare');
var breakpoints = require('../../utilities/breakpoints.js');
var css = require('../../utilities/css.js');
var ResourceItem_module = require('./ResourceItem.css.js');
var types = require('../../utilities/resource-list/types.js');
var context = require('../../utilities/resource-list/context.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var utils = require('../Button/utils.js');
var Popover = require('../Popover/Popover.js');
var Button = require('../Button/Button.js');
var ActionList = require('../ActionList/ActionList.js');
var Box = require('../Box/Box.js');
var InlineGrid = require('../InlineGrid/InlineGrid.js');
var InlineStack = require('../InlineStack/InlineStack.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');

class BaseResourceItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      actionsMenuVisible: false,
      focused: false,
      focusedInner: false,
      selected: isSelected(this.props.id, this.props.context.selectedItems)
    };
    this.node = null;
    this.overlayRef = /*#__PURE__*/React.createRef();
    this.buttonOverlay = /*#__PURE__*/React.createRef();
    this.setNode = node => {
      this.node = node;
    };
    this.handleFocus = event => {
      if (event.target === this.buttonOverlay.current || this.node && event.target === this.overlayRef.current) {
        this.setState({
          focused: true,
          focusedInner: false
        });
      } else if (this.node && this.node.contains(event.target)) {
        this.setState({
          focused: true,
          focusedInner: true
        });
      }
    };
    this.handleBlur = ({
      relatedTarget
    }) => {
      if (this.node && relatedTarget instanceof Element && this.node.contains(relatedTarget)) {
        return;
      }
      this.setState({
        focused: false,
        focusedInner: false
      });
    };
    this.handleMouseOut = () => {
      this.state.focused && this.setState({
        focused: false,
        focusedInner: false
      });
      if (this.props.onMouseOut) {
        this.props.onMouseOut();
      }
    };
    this.handleLargerSelectionArea = event => {
      stopPropagation(event);
      this.handleSelection(!this.state.selected, event.nativeEvent.shiftKey);
    };
    this.handleSelection = (value, shiftKey) => {
      const {
        id,
        sortOrder,
        context: {
          onSelectionChange
        }
      } = this.props;
      if (id == null || onSelectionChange == null) {
        return;
      }
      this.setState({
        focused: value,
        focusedInner: value
      });
      onSelectionChange(value, id, sortOrder, shiftKey);
    };
    this.handleClick = event => {
      stopPropagation(event);
      const {
        id,
        onClick,
        url,
        context: {
          selectMode
        }
      } = this.props;
      const {
        ctrlKey,
        metaKey
      } = event.nativeEvent;
      const anchor = this.node && this.node.querySelector('a');
      if (selectMode) {
        this.handleLargerSelectionArea(event);
        return;
      }
      if (anchor === event.target) {
        return;
      }
      if (onClick) {
        onClick(id);
      }
      if (url && (ctrlKey || metaKey)) {
        window.open(url, '_blank');
        return;
      }
      if (url && anchor) {
        anchor.click();
      }
    };
    // This fires onClick when there is a URL on the item
    this.handleKeyUp = event => {
      const {
        disabled,
        onClick = noop,
        context: {
          selectMode
        }
      } = this.props;
      const {
        key
      } = event;
      if (key === 'Enter' && this.props.url && !selectMode && !disabled) {
        onClick();
      }
    };
    this.handleActionsClick = () => {
      this.setState(({
        actionsMenuVisible
      }) => ({
        actionsMenuVisible: !actionsMenuVisible
      }));
    };
    this.handleCloseRequest = () => {
      this.setState({
        actionsMenuVisible: false
      });
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const selected = isSelected(nextProps.id, nextProps.context.selectedItems);
    if (prevState.selected === selected) {
      return null;
    }
    return {
      selected
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      children: nextChildren,
      context: {
        selectedItems: nextSelectedItems,
        ...restNextContext
      },
      ...restNextProps
    } = nextProps;
    const {
      children,
      context: {
        selectedItems,
        ...restContext
      },
      ...restProps
    } = this.props;
    const nextSelectMode = nextProps.context.selectMode;
    return !isEqual(this.state, nextState) || this.props.context.selectMode !== nextSelectMode || !nextProps.context.selectMode && (!isEqual(restProps, restNextProps) || !isEqual(restContext, restNextContext));
  }
  render() {
    const {
      children,
      url,
      external,
      media,
      shortcutActions,
      ariaControls,
      ariaExpanded,
      persistActions = false,
      accessibilityLabel,
      name,
      context: {
        selectable,
        selectMode,
        hasBulkActions,
        loading,
        resourceName
      },
      i18n,
      verticalAlignment,
      dataHref,
      breakpoints,
      onMouseOver,
      disabled
    } = this.props;
    const {
      actionsMenuVisible,
      focused,
      focusedInner,
      selected
    } = this.state;
    let ownedMarkup = null;
    let handleMarkup = null;
    if (selectable) {
      const checkboxAccessibilityLabel = name || accessibilityLabel || i18n.translate('Polaris.Common.checkbox');
      handleMarkup = /*#__PURE__*/React.createElement("div", {
        className: ResourceItem_module.default.CheckboxWrapper,
        onClick: stopPropagation,
        onChange: this.handleLargerSelectionArea
      }, /*#__PURE__*/React.createElement(UseId, null, id => /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
        id: id,
        label: checkboxAccessibilityLabel,
        labelHidden: true,
        checked: selected,
        disabled: loading || disabled,
        bleedInlineStart: "300",
        bleedInlineEnd: "300",
        bleedBlockStart: "300",
        bleedBlockEnd: "300",
        fill: true,
        labelClassName: ResourceItem_module.default.CheckboxLabel
      })));
    }
    if (media || selectable) {
      ownedMarkup = /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
        gap: "300",
        blockAlign: media && selectable ? 'center' : getAlignment(verticalAlignment)
      }, handleMarkup, media);
    }
    const className = css.classNames(ResourceItem_module.default.ResourceItem, focused && ResourceItem_module.default.focused, selectable && ResourceItem_module.default.selectable, selected && ResourceItem_module.default.selected, selectMode && ResourceItem_module.default.selectMode, persistActions && ResourceItem_module.default.persistActions, focusedInner && ResourceItem_module.default.focusedInner, disabled && ResourceItem_module.default.disabled);
    const listItemClassName = css.classNames(ResourceItem_module.default.ListItem, focused && !focusedInner && ResourceItem_module.default.focused, hasBulkActions && ResourceItem_module.default.hasBulkActions, selected && ResourceItem_module.default.selected, selectable && ResourceItem_module.default.selectable);
    let actionsMarkup = null;
    let disclosureMarkup = null;
    if (shortcutActions && !loading) {
      if (persistActions) {
        actionsMarkup = breakpoints?.lgUp ? /*#__PURE__*/React.createElement("div", {
          className: ResourceItem_module.default.Actions,
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(shortcutActions, {
          variant: 'tertiary'
        }))) : null;
        const disclosureAccessibilityLabel = name ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
          accessibilityLabel: name
        }) : i18n.translate('Polaris.ResourceList.Item.actionsDropdown');
        disclosureMarkup = !selectMode && breakpoints?.lgDown ? /*#__PURE__*/React.createElement("div", {
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(Popover.Popover, {
          activator: /*#__PURE__*/React.createElement(Button.Button, {
            accessibilityLabel: disclosureAccessibilityLabel,
            onClick: this.handleActionsClick,
            variant: "tertiary",
            icon: polarisIcons.MenuHorizontalIcon
          }),
          onClose: this.handleCloseRequest,
          active: actionsMenuVisible
        }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
          items: shortcutActions
        }))) : null;
      } else if (breakpoints?.lgUp) {
        actionsMarkup = /*#__PURE__*/React.createElement("div", {
          className: ResourceItem_module.default.Actions,
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(Box.Box, {
          position: "absolute",
          insetBlockStart: "400",
          insetInlineEnd: "500"
        }, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, {
          variant: "segmented"
        }, utils.buttonsFrom(shortcutActions, {
          size: 'slim'
        }))));
      }
    }
    const containerMarkup = /*#__PURE__*/React.createElement(Box.Box, {
      id: this.props.id,
      position: "relative",
      paddingInlineStart: "300",
      paddingInlineEnd: "300",
      paddingBlockStart: "300",
      paddingBlockEnd: "300",
      zIndex: "var(--pc-resource-item-content-stacking-order)"
    }, /*#__PURE__*/React.createElement(InlineGrid.InlineGrid, {
      columns: {
        xs: '1fr auto'
      }
    }, /*#__PURE__*/React.createElement(InlineGrid.InlineGrid, {
      columns: {
        xs: media || selectable ? 'auto 1fr' : '1fr'
      },
      gap: "300"
    }, ownedMarkup, /*#__PURE__*/React.createElement(InlineStack.InlineStack, {
      blockAlign: getAlignment(verticalAlignment)
    }, /*#__PURE__*/React.createElement(Box.Box, {
      width: "100%",
      padding: "0"
    }, children))), actionsMarkup, disclosureMarkup));
    const tabIndex = loading ? -1 : 0;
    const ariaLabel = accessibilityLabel || i18n.translate('Polaris.ResourceList.Item.viewItem', {
      itemName: name || resourceName && resourceName.singular || ''
    });
    const accessibleMarkup = url ? /*#__PURE__*/React.createElement(UseId, null, id => /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      "aria-describedby": this.props.id,
      "aria-label": ariaLabel,
      className: ResourceItem_module.default.Link,
      url: url,
      external: external,
      tabIndex: tabIndex,
      id: id,
      ref: this.overlayRef
    })) : /*#__PURE__*/React.createElement("button", {
      className: ResourceItem_module.default.Button,
      "aria-label": ariaLabel,
      "aria-controls": ariaControls,
      "aria-expanded": ariaExpanded,
      onClick: this.handleClick,
      tabIndex: tabIndex,
      ref: this.buttonOverlay
    });
    return /*#__PURE__*/React.createElement("li", {
      className: listItemClassName,
      "data-href": dataHref
    }, /*#__PURE__*/React.createElement("div", {
      className: ResourceItem_module.default.ItemWrapper
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.setNode,
      className: className,
      onClick: disabled ? () => {} : this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
      onMouseOver: onMouseOver,
      onMouseOut: this.handleMouseOut,
      "data-href": url
    }, disabled ? null : accessibleMarkup, containerMarkup)));
  }
}
function noop() {}
function stopPropagation(event) {
  event.stopPropagation();
}
function isSelected(id, selectedItems) {
  return Boolean(selectedItems && (Array.isArray(selectedItems) && selectedItems.includes(id) || selectedItems === types.SELECT_ALL_ITEMS));
}
function ResourceItem(props) {
  const breakpoints$1 = breakpoints.useBreakpoints();
  return /*#__PURE__*/React.createElement(BaseResourceItem, Object.assign({}, props, {
    breakpoints: breakpoints$1,
    context: React.useContext(context.ResourceListContext),
    i18n: hooks.useI18n()
  }));
}
function getAlignment(alignment) {
  switch (alignment) {
    case 'leading':
      return 'start';
    case 'trailing':
      return 'end';
    case 'center':
      return 'center';
    case 'fill':
      return 'stretch';
    case 'baseline':
      return 'baseline';
    default:
      return 'start';
  }
}
function UseId(props) {
  const id = React.useId();
  return props.children(id);
}

exports.ResourceItem = ResourceItem;
