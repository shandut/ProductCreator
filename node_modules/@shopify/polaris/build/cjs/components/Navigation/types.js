'use strict';

let MatchState = /*#__PURE__*/function (MatchState) {
  MatchState[MatchState["MatchForced"] = 0] = "MatchForced";
  MatchState[MatchState["MatchUrl"] = 1] = "MatchUrl";
  MatchState[MatchState["MatchPaths"] = 2] = "MatchPaths";
  MatchState[MatchState["Excluded"] = 3] = "Excluded";
  MatchState[MatchState["NoMatch"] = 4] = "NoMatch";
  return MatchState;
}({});

exports.MatchState = MatchState;
