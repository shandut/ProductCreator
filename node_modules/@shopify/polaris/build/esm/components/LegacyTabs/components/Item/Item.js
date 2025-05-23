import React, { PureComponent } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../LegacyTabs.css.js';
import { UnstyledLink } from '../../../UnstyledLink/UnstyledLink.js';
import { FeaturesContext } from '../../../../utilities/features/context.js';

class Item extends PureComponent {
  constructor(...args) {
    super(...args);
    this.focusedNode = null;
    this.setFocusedNode = node => {
      this.focusedNode = node;
    };
  }
  componentDidMount() {
    const {
      focusedNode
    } = this;
    const {
      focused
    } = this.props;
    if (focusedNode && focusedNode instanceof HTMLElement && focused) {
      focusedNode.focus();
    }
  }
  componentDidUpdate() {
    const {
      focusedNode
    } = this;
    const {
      focused
    } = this.props;
    if (focusedNode && focusedNode instanceof HTMLElement && focused) {
      focusedNode.focus();
    }
  }
  render() {
    const {
      id,
      panelID,
      children,
      url,
      accessibilityLabel,
      onClick = noop
    } = this.props;
    const classname = classNames(styles.Item);
    const sharedProps = {
      id,
      ref: this.setFocusedNode,
      onClick,
      className: classname,
      'aria-controls': panelID,
      'aria-selected': false,
      'aria-label': accessibilityLabel
    };
    const markup = url ? /*#__PURE__*/React.createElement(UnstyledLink, Object.assign({}, sharedProps, {
      url: url
    }), children) : /*#__PURE__*/React.createElement("button", Object.assign({}, sharedProps, {
      type: "button"
    }), children);
    return /*#__PURE__*/React.createElement("li", null, markup);
  }
}
Item.contextType = FeaturesContext;
function noop() {}

export { Item };
