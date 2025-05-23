import React from 'react';
import type { PropsWithChildren } from 'react';
import type { ColorTextAlias } from '@shopify/polaris-tokens';
import type { Action, DisableableAction, LoadableAction } from '../../types';
import type { BoxProps } from '../Box';
import type { IconProps } from '../Icon';
import type { BannerHandles } from './utilities';
export type BannerTone = 'success' | 'info' | 'warning' | 'critical';
export interface BannerProps {
    /** Title content for the banner. */
    title?: string;
    /** Status icon to display in the banner. Use only major icons */
    icon?: IconProps['source'];
    /** Renders the banner without a status icon. */
    hideIcon?: boolean;
    /** Sets the status of the banner. */
    tone?: BannerTone;
    /** The child elements to render in the banner. */
    children?: React.ReactNode;
    /** Action for banner */
    action?: DisableableAction & LoadableAction;
    /** Action | Displays a secondary action */
    secondaryAction?: Action;
    /** Callback when banner is dismissed */
    onDismiss?(): void;
    /** Disables screen reader announcements when changing the content of the banner */
    stopAnnouncements?: boolean;
}
export declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<BannerHandles>>;
interface BannerLayoutProps {
    backgroundColor: BoxProps['background'];
    textColor: ColorTextAlias;
    bannerTitle: React.ReactNode;
    bannerIcon: React.ReactNode;
    actionButtons: React.ReactNode;
    dismissButton: React.ReactNode;
}
export declare function BannerLayout({ tone, icon, hideIcon, onDismiss, action, secondaryAction, title, children, }: BannerProps): React.JSX.Element;
export declare function DefaultBanner({ backgroundColor, textColor, bannerTitle, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<BannerLayoutProps>): React.JSX.Element;
export declare function InlineIconBanner({ backgroundColor, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<Omit<BannerLayoutProps, 'textColor' | 'bannerTitle'>>): React.JSX.Element;
export declare function WithinContentContainerBanner({ backgroundColor, textColor, bannerTitle, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<BannerLayoutProps>): React.JSX.Element;
export {};
//# sourceMappingURL=Banner.d.ts.map