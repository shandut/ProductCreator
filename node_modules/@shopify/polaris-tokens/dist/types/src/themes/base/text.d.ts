import type { MetaTokenProperties } from '../types';
import type { FontPrefix } from './font';
export type TextVariant = 'heading-3xl' | 'heading-2xl' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'heading-xs' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs';
export type TextTokenName = `text-${TextVariant}-${FontPrefix}`;
export type TextTokenGroup = {
    [TokenName in TextTokenName]: string;
};
export declare const text: {
    [TokenName in TextTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=text.d.ts.map