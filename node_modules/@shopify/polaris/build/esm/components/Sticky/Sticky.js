import React, { Component } from 'react';
import { getRectForNode } from '../../utilities/geometry.js';
import { useStickyManager } from '../../utilities/sticky-manager/hooks.js';

class StickyInner extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isSticky: false,
      style: {}
    };
    this.placeHolderNode = null;
    this.stickyNode = null;
    this.setPlaceHolderNode = node => {
      this.placeHolderNode = node;
    };
    this.setStickyNode = node => {
      this.stickyNode = node;
    };
    this.handlePositioning = (stick, top = 0, left = 0, width = 0) => {
      const {
        isSticky
      } = this.state;
      if (stick && !isSticky || !stick && isSticky) {
        this.adjustPlaceHolderNode(stick);
        this.setState({
          isSticky: !isSticky
        }, () => {
          if (this.props.onStickyChange == null) {
            return null;
          }
          this.props.onStickyChange(!isSticky);
          if (this.props.boundingElement == null) {
            return null;
          }
          this.props.boundingElement.toggleAttribute('data-sticky-active');
        });
      }
      const style = stick ? {
        position: 'fixed',
        top,
        left,
        width
      } : {};
      this.setState({
        style
      });
    };
    this.adjustPlaceHolderNode = add => {
      if (this.placeHolderNode && this.stickyNode) {
        this.placeHolderNode.style.paddingBottom = add ? `${getRectForNode(this.stickyNode).height}px` : '0px';
      }
    };
  }
  componentDidMount() {
    const {
      boundingElement,
      offset = false,
      disableWhenStacked = false,
      stickyManager
    } = this.props;
    if (!this.stickyNode || !this.placeHolderNode) return;
    stickyManager.registerStickyItem({
      stickyNode: this.stickyNode,
      placeHolderNode: this.placeHolderNode,
      handlePositioning: this.handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked
    });
  }
  componentDidUpdate() {
    const {
      boundingElement,
      offset = false,
      disableWhenStacked = false,
      stickyManager
    } = this.props;
    if (!this.stickyNode || !this.placeHolderNode) return;
    const stickyManagerItem = stickyManager.getStickyItem(this.stickyNode);
    const didPropsChange = !stickyManagerItem || boundingElement !== stickyManagerItem.boundingElement || offset !== stickyManagerItem.offset || disableWhenStacked !== stickyManagerItem.disableWhenStacked;
    if (!didPropsChange) return;
    stickyManager.unregisterStickyItem(this.stickyNode);
    stickyManager.registerStickyItem({
      stickyNode: this.stickyNode,
      placeHolderNode: this.placeHolderNode,
      handlePositioning: this.handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked
    });
  }
  componentWillUnmount() {
    const {
      stickyManager
    } = this.props;
    if (!this.stickyNode) return;
    stickyManager.unregisterStickyItem(this.stickyNode);
  }
  render() {
    const {
      style,
      isSticky
    } = this.state;
    const {
      children
    } = this.props;
    const childrenContent = isFunction(children) ? children(isSticky) : children;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      ref: this.setPlaceHolderNode
    }), /*#__PURE__*/React.createElement("div", {
      ref: this.setStickyNode,
      style: style
    }, childrenContent));
  }
}

// This should have a typeguard instead of using Function
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(arg) {
  return typeof arg === 'function';
}
function Sticky(props) {
  const stickyManager = useStickyManager();
  return /*#__PURE__*/React.createElement(StickyInner, Object.assign({}, props, {
    stickyManager: stickyManager
  }));
}

export { Sticky };
