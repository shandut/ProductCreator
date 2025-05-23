/// <reference types="react" />
import type { ColorBackgroundAlias, ColorIconAlias, ColorTextAlias } from '@shopify/polaris-tokens';
import type { IconSource } from '../../types';
import type { BannerTone } from './Banner';
interface BannerColorAliases {
    background: ColorBackgroundAlias;
    text: ColorTextAlias;
    icon: ColorIconAlias | ColorTextAlias;
}
interface BannerAttributes {
    withinPage: BannerColorAliases;
    withinContentContainer: BannerColorAliases;
    icon: IconSource;
}
export declare const bannerAttributes: {
    [key in BannerTone]: BannerAttributes;
};
export interface BannerHandles {
    focus(): void;
}
export declare function useBannerFocus(bannerRef: React.Ref<BannerHandles>): {
    wrapperRef: import("react").RefObject<HTMLDivElement>;
    handleKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleBlur: () => void;
    handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void;
    shouldShowFocus: boolean;
};
export {};
//# sourceMappingURL=utilities.d.ts.map