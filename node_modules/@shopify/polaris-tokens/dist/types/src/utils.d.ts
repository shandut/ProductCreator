import type { Exact } from './types';
import type { breakpoints as metaBreakpointsTokenGroup, BreakpointsTokenGroup, BreakpointsTokenName } from './themes/base/breakpoints';
import type { MetaTheme, MetaThemeShape, MetaTokenGroupShape, Theme, TokenName } from './themes/types';
export declare function getUnit(value?: string): string | null;
export declare function toPx(value?: string): string | undefined;
export declare function toPxs(value: string): string;
export declare function toEm(value?: string, fontSize?: number): string | undefined;
export declare function toRem(value?: string): string | undefined;
export declare function rem(value: string): string;
export declare function tokenGroupToRems<T extends MetaTokenGroupShape>(metaTokenGroup: T): T;
export declare function createVarName(tokenName: TokenName): string;
export declare function createVar(tokenName: TokenName): string;
/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-keyframes-fade-in', 'p-keyframes-spin', etc...]
 */
export declare function getKeyframeNames(motionTokenGroup: MetaTokenGroupShape): (string | null)[];
export declare function getTokenNames(theme: Theme | MetaTheme): TokenName[];
/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-color-bg', '--p-color-text', etc...]
 */
export declare function getThemeVarNames(theme: Theme): string[];
export type MetaBreakpointsTokenGroup = typeof metaBreakpointsTokenGroup;
/**
 * Alias direction used for composing Polaris `breakpoints` utilities.
 */
export type BreakpointsAliasDirection = 'up' | 'down' | 'only';
/**
 * A collection of directional media conditions for a given Polaris `breakpoints` alias.
 */
export type BreakpointsAliasDirectionMediaConditions = {
    [AliasDirection in BreakpointsAliasDirection]: string;
};
/**
 * Media conditions for all Polaris `breakpoints` aliases.
 */
export type BreakpointsMediaConditions = {
    [TokenName in BreakpointsTokenName]: BreakpointsAliasDirectionMediaConditions;
};
export declare function getMediaConditions(breakpoints: BreakpointsTokenGroup): BreakpointsMediaConditions;
export declare function isKeyOf<T extends {
    [key: string]: any;
}>(obj: T, key: PropertyKey | undefined): key is keyof T;
export declare const tokenGroupNamesToRems: string[];
/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemeBase({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
export declare function createMetaThemeBase<T extends Exact<MetaThemeShape, T>>(metaTheme: T): T;
//# sourceMappingURL=utils.d.ts.map