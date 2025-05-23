import React, { memo, forwardRef } from 'react';
import { unstyled } from '../shared.js';
import { useLink } from '../../utilities/link/hooks.js';

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.

// Wrapping forwardRef in a memo gets a name set since
// https://github.com/facebook/react/issues/16722
// but eslint-plugin-react doesn't know that just yet
// eslint-disable-next-line react/display-name
const UnstyledLink = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(function UnstyledLink(props, _ref) {
  const LinkComponent = useLink();
  if (LinkComponent) {
    return /*#__PURE__*/React.createElement(LinkComponent, Object.assign({}, unstyled.props, props, {
      ref: _ref
    }));
  }
  const {
    external,
    url,
    target: targetProp,
    ...rest
  } = props;
  let target;
  if (external) {
    target = '_blank';
  } else {
    target = targetProp ?? undefined;
  }
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
  return /*#__PURE__*/React.createElement("a", Object.assign({
    target: target
  }, rest, {
    href: url,
    rel: rel
  }, unstyled.props, {
    ref: _ref
  }));
}));

export { UnstyledLink };
