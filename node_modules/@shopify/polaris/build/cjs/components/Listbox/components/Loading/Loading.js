'use strict';

var React = require('react');
var Loading_module = require('./Loading.css.js');
var hooks = require('../../../../utilities/listbox/hooks.js');
var Spinner = require('../../../Spinner/Spinner.js');

const Loading = /*#__PURE__*/React.memo(function LoadingOption({
  children,
  accessibilityLabel: label
}) {
  const {
    setLoading
  } = hooks.useListbox();
  React.useEffect(() => {
    setLoading(label);
    return () => {
      setLoading(undefined);
    };
  }, [label, setLoading]);
  return /*#__PURE__*/React.createElement("li", {
    className: Loading_module.default.ListItem,
    role: "presentation"
  }, children ? children : /*#__PURE__*/React.createElement("div", {
    className: Loading_module.default.Loading
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small",
    accessibilityLabel: label
  })));
});

exports.Loading = Loading;
