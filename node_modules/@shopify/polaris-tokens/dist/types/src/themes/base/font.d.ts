import type { MetaTokenProperties } from '../types';
export type FontFamilyPrefix = 'font-family';
type FontFamilyAlias = 'sans' | 'mono';
export type FontSizePrefix = 'font-size';
export type FontSizeScale = '275' | '300' | '325' | '350' | '400' | '450' | '500' | '550' | '600' | '750' | '800' | '900' | '1000';
export type FontLineHeightPrefix = 'font-line-height';
export type FontLineHeightScale = '300' | '400' | '500' | '600' | '700' | '800' | '1000' | '1200';
export type FontLetterSpacingPrefix = 'font-letter-spacing';
export type FontLetterSpacingAlias = 'densest' | 'denser' | 'dense' | 'normal';
export type FontWeightPrefix = 'font-weight';
export type FontWeightAlias = 'regular' | 'medium' | 'semibold' | 'bold';
export type FontPrefix = FontFamilyPrefix | FontLetterSpacingPrefix | FontLineHeightPrefix | FontSizePrefix | FontWeightPrefix;
export type FontTokenName = `${FontFamilyPrefix}-${FontFamilyAlias}` | `${FontLetterSpacingPrefix}-${FontLetterSpacingAlias}` | `${FontLineHeightPrefix}-${FontLineHeightScale}` | `${FontSizePrefix}-${FontSizeScale}` | `${FontWeightPrefix}-${FontWeightAlias}`;
export type FontTokenGroup = {
    [TokenName in FontTokenName]: string;
};
export declare const font: {
    [TokenName in FontTokenName]: MetaTokenProperties;
};
export {};
//# sourceMappingURL=font.d.ts.map