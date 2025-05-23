import type { MetaTokenProperties } from '../types';
export type HeightScale = '0' | '025' | '050' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '1000' | '1200' | '1600' | '2000' | '2400' | '2800' | '3200';
export type HeightTokenName = `height-${HeightScale}`;
export type HeightTokenGroup = {
    [TokenName in HeightTokenName]: string;
};
export declare const height: {
    [TokenName in HeightTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=height.d.ts.map