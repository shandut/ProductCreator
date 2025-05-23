import React from 'react';
import type { ThemeName } from '@shopify/polaris-tokens';
import { FrameContext } from '../../utilities/frame';
import { MediaQueryContext } from '../../utilities/media-query';
import { I18n } from '../../utilities/i18n';
import type { LinkLikeComponent } from '../../utilities/link';
import type { FeaturesConfig } from '../../utilities/features';
type FrameContextType = NonNullable<React.ContextType<typeof FrameContext>>;
type MediaQueryContextType = NonNullable<React.ContextType<typeof MediaQueryContext>>;
/**
 * When writing a custom mounting function `mountWithAppContext(node, options)`
 * this is the type of the options object. These values are customizable when
 * you call the app
 */
export interface WithPolarisTestProviderOptions {
    i18n?: ConstructorParameters<typeof I18n>[0];
    link?: LinkLikeComponent;
    mediaQuery?: Partial<MediaQueryContextType>;
    features?: FeaturesConfig;
    theme?: ThemeName;
    frame?: Partial<FrameContextType>;
}
export interface PolarisTestProviderProps extends WithPolarisTestProviderOptions {
    children: React.ReactElement;
    strict?: boolean;
}
export declare function PolarisTestProvider({ strict, children, i18n, link, mediaQuery, features, frame, theme: themeName, }: PolarisTestProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=PolarisTestProvider.d.ts.map