import type { Exact } from '../types';
import type { ExtractMetaThemeValues, ExtractMetaTokenGroupValues, MetaThemeShape, MetaTheme, MetaThemePartialShape, MetaTokenGroupShape, ThemeName, TokenName, Theme } from './types';
/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemePartial({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
export declare function createMetaThemePartial<T extends Exact<MetaThemePartialShape, T>>(metaThemePartial: T): T;
export declare function createMetaTheme<T extends Exact<MetaThemePartialShape, T>>(metaThemePartial: T): MetaTheme;
export declare function createThemeClassName(themeName: ThemeName): string;
export declare function createThemeSelector(themeName: ThemeName): string;
export declare function extractMetaTokenGroupValues<T extends MetaTokenGroupShape>(metaTokenGroup: T): ExtractMetaTokenGroupValues<T>;
export declare function extractMetaThemeValues<T extends MetaThemeShape>(metaTheme: T): ExtractMetaThemeValues<T>;
export declare function flattenMetaTheme(metaTheme: MetaThemeShape): {
    [k: string]: import("./types").MetaTokenProperties;
};
export declare function resolveMetaThemeRefs<T extends MetaThemeShape>(metaTheme: T): T;
export declare function createIsTokenName(theme: Theme | MetaTheme): (tokenName: unknown) => tokenName is TokenName;
//# sourceMappingURL=utils.d.ts.map