'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Text_module = require('./Text.css.js');

const deprecatedVariants = {
  heading3xl: 'heading2xl'
};
const Text = ({
  alignment,
  as,
  breakWord,
  children,
  tone,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false,
  textDecorationLine
}) => {
  if (process.env.NODE_ENV === 'development' && variant && Object.prototype.hasOwnProperty.call(deprecatedVariants, variant)) {
    // eslint-disable-next-line no-console
    console.warn(`Deprecation: <Text variant="${variant}" />. The value "${variant}" will be removed in a future major version of Polaris. Use "${deprecatedVariants[variant]}" instead.`);
  }
  const Component = as || (visuallyHidden ? 'span' : 'p');
  const className = css.classNames(Text_module.default.root, variant && Text_module.default[variant], fontWeight && Text_module.default[fontWeight], (alignment || truncate) && Text_module.default.block, alignment && Text_module.default[alignment], breakWord && Text_module.default.break, tone && Text_module.default[tone], numeric && Text_module.default.numeric, truncate && Text_module.default.truncate, visuallyHidden && Text_module.default.visuallyHidden, textDecorationLine && Text_module.default[textDecorationLine]);
  return /*#__PURE__*/React.createElement(Component, Object.assign({
    className: className
  }, id && {
    id
  }), children);
};

exports.Text = Text;
