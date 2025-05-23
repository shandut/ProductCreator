'use strict';

const listboxSectionDataSelector = {
  props: {
    'data-polaris-listbox-section-item': true
  },
  selector: '[data-polaris-listbox-section-item]'
};
const listboxWithinSectionDataSelector = {
  attribute: 'data-polaris-listbox-within-section-item'
};

exports.listboxSectionDataSelector = listboxSectionDataSelector;
exports.listboxWithinSectionDataSelector = listboxWithinSectionDataSelector;
