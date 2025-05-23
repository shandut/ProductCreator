'use strict';

var React = require('react');

const ListboxContext = /*#__PURE__*/React.createContext(undefined);
const WithinListboxContext = /*#__PURE__*/React.createContext(false);
const ActionContext = /*#__PURE__*/React.createContext(false);

exports.ActionContext = ActionContext;
exports.ListboxContext = ListboxContext;
exports.WithinListboxContext = WithinListboxContext;
