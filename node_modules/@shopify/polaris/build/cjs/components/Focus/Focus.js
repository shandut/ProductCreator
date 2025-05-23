'use strict';

var React = require('react');
var focus = require('../../utilities/focus.js');

const Focus = /*#__PURE__*/React.memo(function Focus({
  children,
  disabled,
  root
}) {
  React.useEffect(() => {
    if (disabled || !root) {
      return;
    }
    const node = isRef(root) ? root.current : root;
    if (!node || node.querySelector('[autofocus]')) {
      return;
    }
    focus.focusFirstFocusableNode(node, false);
  }, [disabled, root]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
});
function isRef(ref) {
  return ref.current !== undefined;
}

exports.Focus = Focus;
