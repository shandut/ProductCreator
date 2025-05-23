'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var LegacyTabs_module = require('../../LegacyTabs.css.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');
var context = require('../../../../utilities/features/context.js');

class Item extends React.PureComponent {
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
    const classname = css.classNames(LegacyTabs_module.default.Item);
    const sharedProps = {
      id,
      ref: this.setFocusedNode,
      onClick,
      className: classname,
      'aria-controls': panelID,
      'aria-selected': false,
      'aria-label': accessibilityLabel
    };
    const markup = url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, Object.assign({}, sharedProps, {
      url: url
    }), children) : /*#__PURE__*/React.createElement("button", Object.assign({}, sharedProps, {
      type: "button"
    }), children);
    return /*#__PURE__*/React.createElement("li", null, markup);
  }
}
Item.contextType = context.FeaturesContext;
function noop() {}

exports.Item = Item;
