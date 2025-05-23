'use strict';

let ToneValue = /*#__PURE__*/function (ToneValue) {
  ToneValue["Info"] = "info";
  ToneValue["Success"] = "success";
  ToneValue["Warning"] = "warning";
  ToneValue["Critical"] = "critical";
  ToneValue["Attention"] = "attention";
  ToneValue["New"] = "new";
  ToneValue["Magic"] = "magic";
  ToneValue["InfoStrong"] = "info-strong";
  ToneValue["SuccessStrong"] = "success-strong";
  ToneValue["WarningStrong"] = "warning-strong";
  ToneValue["CriticalStrong"] = "critical-strong";
  ToneValue["AttentionStrong"] = "attention-strong";
  ToneValue["ReadOnly"] = "read-only";
  ToneValue["Enabled"] = "enabled";
  return ToneValue;
}({});
let ProgressValue = /*#__PURE__*/function (ProgressValue) {
  ProgressValue["Incomplete"] = "incomplete";
  ProgressValue["PartiallyComplete"] = "partiallyComplete";
  ProgressValue["Complete"] = "complete";
  return ProgressValue;
}({});

exports.ProgressValue = ProgressValue;
exports.ToneValue = ToneValue;
