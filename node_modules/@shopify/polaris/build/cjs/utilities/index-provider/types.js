'use strict';

const SELECT_ALL_ITEMS = 'All';
let SelectionType = /*#__PURE__*/function (SelectionType) {
  SelectionType["All"] = "all";
  SelectionType["Page"] = "page";
  SelectionType["Multi"] = "multi";
  SelectionType["Single"] = "single";
  SelectionType["Range"] = "range";
  return SelectionType;
}({});

exports.SELECT_ALL_ITEMS = SELECT_ALL_ITEMS;
exports.SelectionType = SelectionType;
