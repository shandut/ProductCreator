import type { MetaTokenProperties } from '../types';
export type ZIndexZScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export type ZIndexTokenName = `z-index-${ZIndexZScale}`;
export type ZIndexTokenGroup = {
    [TokenName in ZIndexTokenName]: string;
};
export declare const zIndex: {
    [TokenName in ZIndexTokenName]: MetaTokenProperties;
};
//# sourceMappingURL=zIndex.d.ts.map