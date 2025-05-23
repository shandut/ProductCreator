import type { MetaTokenProperties } from '../types';
export type SpaceScale = '0' | '025' | '050' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '800' | '1000' | '1200' | '1600' | '2000' | '2400' | '2800' | '3200';
export type SpaceAlias = 
/** Specialty and component spacing. */
'button-group-gap' | 'card-gap' | 'card-padding' | 'table-cell-padding';
export type SpaceAliasOrScale = SpaceAlias | SpaceScale;
export type SpaceTokenName = `space-${SpaceAliasOrScale}`;
export type SpaceTokenGroup = {
    [TokenName in SpaceTokenName]: string;
};
export declare const space: {
    [TokenName in SpaceTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=space.d.ts.map