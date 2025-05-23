import type { MetaTokenProperties } from '../types';
export type ShadowScale = '0' | '100' | '200' | '300' | '400' | '500' | '600';
export type ShadowBevelScale = '100';
export type ShadowInsetScale = '100' | '200';
export type ShadowAlias = 'button' | 'button-hover' | 'button-inset' | 'button-primary' | 'button-primary-hover' | 'button-primary-inset' | 'button-primary-critical' | 'button-primary-critical-hover' | 'button-primary-critical-inset' | 'button-primary-success' | 'button-primary-success-hover' | 'button-primary-success-inset' | 'border-inset';
export type ShadowAliasOrScale = ShadowAlias | ShadowScale;
export type ShadowTokenName = `shadow-${ShadowAliasOrScale}` | `shadow-bevel-${ShadowBevelScale}` | `shadow-inset-${ShadowInsetScale}`;
export type ShadowTokenGroup = {
    [TokenName in ShadowTokenName]: string;
};
export declare const shadow: {
    [TokenName in ShadowTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=shadow.d.ts.map