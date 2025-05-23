import type { MetaTokenProperties } from '../types';
export type MotionDurationScale = '0' | '50' | '100' | '150' | '200' | '250' | '300' | '350' | '400' | '450' | '500' | '5000';
export type MotionKeyframesAlias = 'bounce' | 'fade-in' | 'pulse' | 'spin' | 'appear-above' | 'appear-below';
type MotionTimingFunctionAlias = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
export type MotionTokenName = `motion-duration-${MotionDurationScale}` | `motion-keyframes-${MotionKeyframesAlias}` | `motion-${MotionTimingFunctionAlias}`;
export type MotionTokenGroup = {
    [TokenName in MotionTokenName]: string;
};
export declare const motion: {
    [TokenName in MotionTokenName]: MetaTokenProperties;
};
export {};
//# sourceMappingURL=motion.d.ts.map