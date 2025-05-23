import type { MetaTokenProperties } from '../types';
export type BorderRadiusScale = '0' | '050' | '100' | '150' | '200' | '300' | '400' | '500' | '750';
export type BorderRadiusAlias = 'full';
export type BorderRadiusAliasOrScale = BorderRadiusAlias | BorderRadiusScale;
export type BorderWidthScale = '0' | '0165' | '025' | '050' | '100';
export type BorderTokenName = `border-radius-${BorderRadiusAliasOrScale}` | `border-width-${BorderWidthScale}`;
export type BorderTokenGroup = {
    [TokenName in BorderTokenName]: string;
};
export declare const border: {
    [TokenName in BorderTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=border.d.ts.map