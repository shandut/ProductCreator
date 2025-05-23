/// <reference types="react" />
import type { FeaturesConfig } from './types';
export declare function useFeatures(): FeaturesConfig;
/**
 * Temporary child render prop for accessing features in class components.
 */
export declare function UseFeatures(props: {
    children: (featuresConfig: FeaturesConfig) => JSX.Element;
}): JSX.Element;
//# sourceMappingURL=hooks.d.ts.map