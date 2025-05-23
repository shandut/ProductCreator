import React, { Component, createRef } from 'react';
import { debounce } from '../../../../utilities/debounce.js';
import { classNames } from '../../../../utilities/css.js';
import styles from './ConnectedFilterControl.css.js';
import { Item } from './components/Item/Item.js';
import { EventListener } from '../../../EventListener/EventListener.js';
import { Button } from '../../../Button/Button.js';
import { Popover } from '../../../Popover/Popover.js';

const FILTER_FIELD_MIN_WIDTH = 150;
class ConnectedFilterControl extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      availableWidth: 0,
      proxyButtonsWidth: {}
    };
    this.container = /*#__PURE__*/createRef();
    this.proxyButtonContainer = /*#__PURE__*/createRef();
    this.moreFiltersButtonContainer = /*#__PURE__*/createRef();
    this.handleResize = debounce(() => {
      this.measureProxyButtons();
      this.measureAvailableWidth();
    }, 40, {
      leading: true,
      trailing: true,
      maxWait: 40
    });
  }
  componentDidMount() {
    this.handleResize();
  }
  render() {
    const {
      children,
      rightPopoverableActions,
      rightAction,
      auxiliary,
      forceShowMorefiltersButton = true,
      queryFieldHidden
    } = this.props;
    const actionsToRender = rightPopoverableActions != null ? this.getActionsToRender(rightPopoverableActions) : [];
    const className = classNames(styles.ConnectedFilterControl, rightPopoverableActions && styles.right);
    const shouldRenderMoreFiltersButton = forceShowMorefiltersButton || rightPopoverableActions && rightPopoverableActions.length !== actionsToRender.length;
    const RightContainerClassName = classNames(styles.RightContainer, !shouldRenderMoreFiltersButton && styles.RightContainerWithoutMoreFilters, queryFieldHidden && styles.queryFieldHidden);
    const rightMarkup = actionsToRender.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: RightContainerClassName
    }, this.popoverFrom(actionsToRender)) : null;
    const moreFiltersButtonContainerClassname = classNames(styles.MoreFiltersButtonContainer, actionsToRender.length === 0 && styles.onlyButtonVisible);
    const rightActionMarkup = rightAction ? /*#__PURE__*/React.createElement("div", {
      ref: this.moreFiltersButtonContainer,
      className: moreFiltersButtonContainerClassname
    }, shouldRenderMoreFiltersButton && /*#__PURE__*/React.createElement(Item, null, rightAction)) : null;
    const proxyButtonMarkup = rightPopoverableActions ? /*#__PURE__*/React.createElement("div", {
      className: styles.ProxyButtonContainer,
      ref: this.proxyButtonContainer,
      "aria-hidden": true
    }, rightPopoverableActions.map(action => /*#__PURE__*/React.createElement("div", {
      key: action.key,
      "data-key": action.key
    }, this.activatorButtonFrom(action, {
      proxy: true
    })))) : null;
    const auxMarkup = auxiliary ? /*#__PURE__*/React.createElement("div", {
      className: styles.AuxiliaryContainer
    }, auxiliary) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, proxyButtonMarkup, /*#__PURE__*/React.createElement("div", {
      className: styles.Wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: className,
      ref: this.container
    }, children ? /*#__PURE__*/React.createElement("div", {
      className: styles.CenterContainer
    }, /*#__PURE__*/React.createElement(Item, null, children)) : null, rightMarkup, rightActionMarkup, /*#__PURE__*/React.createElement(EventListener, {
      event: "resize",
      handler: this.handleResize
    })), auxMarkup));
  }
  measureProxyButtons() {
    if (this.proxyButtonContainer.current) {
      const proxyButtonsWidth = {};
      // this number is magical, but tweaking it solved the problem of items overlapping
      const tolerance = 78;
      if (this.proxyButtonContainer.current) {
        Array.from(this.proxyButtonContainer.current.children).forEach(element => {
          const buttonWidth = element.getBoundingClientRect().width + tolerance;
          const buttonKey = element instanceof HTMLElement && element.dataset.key;
          if (buttonKey) {
            proxyButtonsWidth[buttonKey] = buttonWidth;
          }
        });
      }
      this.setState({
        proxyButtonsWidth
      });
    }
  }
  measureAvailableWidth() {
    if (this.container.current && this.moreFiltersButtonContainer.current) {
      const containerWidth = this.container.current.getBoundingClientRect().width;
      const moreFiltersButtonWidth = this.moreFiltersButtonContainer.current.getBoundingClientRect().width;
      const filtersActionWidth = 0;
      const filterFieldMinWidth = this.props.queryFieldHidden ? 0 : FILTER_FIELD_MIN_WIDTH;
      const availableWidth = containerWidth - filterFieldMinWidth - moreFiltersButtonWidth - filtersActionWidth;
      this.setState({
        availableWidth
      });
    }
  }
  getActionsToRender(actions) {
    let remainingWidth = this.state.availableWidth;
    const actionsToReturn = [];
    for (let i = 0; remainingWidth > 0 && i < actions.length; i++) {
      const action = actions[i];
      const actionWidth = this.state.proxyButtonsWidth[action.key];
      if (actionWidth <= remainingWidth) {
        actionsToReturn.push(action);
        remainingWidth -= actionWidth;
      } else {
        // When we can't fit an action, we break the loop.
        // The ones that didn't fit will be accessible through the "More filters" button
        break;
      }
    }
    return actionsToReturn;
  }
  activatorButtonFrom(action, options) {
    const id = options?.proxy ? undefined : `Activator-${action.key}`;
    return /*#__PURE__*/React.createElement(Button, {
      onClick: action.onAction,
      disclosure: true,
      disabled: this.props.disabled || action.disabled,
      id: id,
      size: "large"
    }, action.content);
  }
  popoverFrom(actions) {
    return actions.map(action => {
      return /*#__PURE__*/React.createElement(Item, {
        key: action.key
      }, /*#__PURE__*/React.createElement(Popover, {
        active: action.popoverOpen,
        activator: this.activatorButtonFrom(action),
        onClose: action.onAction,
        preferredAlignment: "left",
        sectioned: true
      }, action.popoverContent));
    });
  }
}

export { ConnectedFilterControl };
