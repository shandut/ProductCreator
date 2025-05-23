import type { MetaTokenProperties } from '../types';
export type WidthScale = '0' | '025' | '050' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '1000' | '1200' | '1600' | '2000' | '2400' | '2800' | '3200';
export type WidthTokenName = `width-${WidthScale}`;
export type WidthTokenGroup = {
    [TokenName in WidthTokenName]: string;
};
export declare const width: {
    [TokenName in WidthTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=width.d.ts.map