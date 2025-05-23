'use strict';

var React = require('react');
var context = require('./context.js');

function useListbox() {
  const listbox = React.useContext(context.ListboxContext);
  if (!listbox) {
    throw new Error('No Listbox was provided. Listbox components must be wrapped in a Listbox');
  }
  return listbox;
}

exports.useListbox = useListbox;
