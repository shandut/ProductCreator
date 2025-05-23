const SELECT_ALL_ITEMS = 'All';
let SelectionType = /*#__PURE__*/function (SelectionType) {
  SelectionType["All"] = "all";
  SelectionType["Page"] = "page";
  SelectionType["Multi"] = "multi";
  SelectionType["Single"] = "single";
  SelectionType["Range"] = "range";
  return SelectionType;
}({});

export { SELECT_ALL_ITEMS, SelectionType };
