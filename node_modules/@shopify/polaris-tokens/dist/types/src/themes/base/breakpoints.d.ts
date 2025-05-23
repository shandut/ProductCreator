import type { MetaTokenProperties } from '../types';
export declare const breakpointsAliases: readonly ["xs", "sm", "md", "lg", "xl"];
export type BreakpointsAlias = (typeof breakpointsAliases)[number];
export type BreakpointsTokenName = `breakpoints-${BreakpointsAlias}`;
export type BreakpointsTokenGroup = {
    [TokenName in BreakpointsTokenName]: string;
};
export declare const breakpoints: {
    [TokenName in BreakpointsTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=breakpoints.d.ts.map