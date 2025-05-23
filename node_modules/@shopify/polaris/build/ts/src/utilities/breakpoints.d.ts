import type { BreakpointsAlias, BreakpointsAliasDirection, BreakpointsTokenGroup } from '@shopify/polaris-tokens';
export declare function navigationBarCollapsed(): MediaQueryList;
export declare function stackedContent(): MediaQueryList;
/**
 * Directional alias for each Polaris `breakpoints` token.
 *
 * @example 'smUp' | 'smDown' | 'smOnly' | 'mdUp' | etc.
 */
export type BreakpointsDirectionAlias = `${BreakpointsAlias}${Capitalize<BreakpointsAliasDirection>}`;
/**
 * Match results for each directional Polaris `breakpoints` alias.
 */
type BreakpointsMatches = {
    [DirectionAlias in BreakpointsDirectionAlias]: boolean;
};
export interface UseBreakpointsOptions {
    /**
     * Default values applied during SSR. Accepts a single value to use for each
     * breakpoint alias, or an object for configuring select breakpoints.
     *
     * @default false
     */
    defaults: boolean | {
        [DirectionAlias in BreakpointsDirectionAlias]?: boolean;
    };
}
/**
 * Retrieves media query matches for each directional Polaris `breakpoints` alias.
 *
 * @example
 * const {smUp} = useBreakpoints();
 * return smUp && 'Hello world';
 *
 * @example
 * const {mdUp} = useBreakpoints({defaults: {mdUp: true}});
 * mdUp //=> `true` during SSR
 *
 * @example
 * const breakpoints = useBreakpoints({defaults: true});
 * breakpoints //=> All values will be `true` during SSR
 */
export declare function useBreakpoints(options?: UseBreakpointsOptions): BreakpointsMatches;
/**
 * Converts `breakpoints` tokens into directional media query entries.
 *
 * @example
 * const breakpointsQueryEntries = getBreakpointsQueryEntries(breakpoints);
 * breakpointsQueryEntries === [
 *   ['xsUp', '(min-width: ...)'],
 *   ['xsDown', '(max-width: ...)'],
 *   ['xsOnly', '(min-width: ...) and (max-width: ...)'],
 *   ['smUp', '(min-width: ...) and (max-width: ...)'],
 *   ['mdUp', '(min-width: ...) and (max-width: ...)'],
 *   // etc.
 * ]
 */
export declare function getBreakpointsQueryEntries(breakpoints: BreakpointsTokenGroup): ["xsUp" | "xsDown" | "xsOnly" | "smUp" | "smDown" | "smOnly" | "mdUp" | "mdDown" | "mdOnly" | "lgUp" | "lgDown" | "lgOnly" | "xlUp" | "xlDown" | "xlOnly", string][];
export {};
//# sourceMappingURL=breakpoints.d.ts.map