import React from 'react';
import type { Logo } from '../../utilities/frame/types';
export interface FrameProps {
    /** Sets the logo for the TopBar, Navigation, and ContextualSaveBar components */
    logo?: Logo;
    /** A horizontal offset that pushes the frame to the right, leaving empty space on the left */
    offset?: string;
    /** The content to display inside the frame. */
    children?: React.ReactNode;
    /** Accepts a top bar component that will be rendered at the top-most portion of an application frame */
    topBar?: React.ReactNode;
    /** Accepts a navigation component that will be rendered in the left sidebar of an application frame */
    navigation?: React.ReactNode;
    /** Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame */
    globalRibbon?: React.ReactNode;
    /** A boolean property indicating whether the mobile navigation is currently visible
     * @default false
     */
    showMobileNavigation?: boolean;
    /** Accepts a ref to the html anchor element you wish to focus when clicking the skip to content link */
    skipToContentTarget?: React.RefObject<HTMLAnchorElement>;
    /** A callback function to handle clicking the mobile navigation dismiss button */
    onNavigationDismiss?(): void;
    /** A boolean property indicating whether there should be space for a sidebar
     * @default false
     */
    sidebar?: boolean;
}
export declare function Frame(props: FrameProps): React.JSX.Element;
//# sourceMappingURL=Frame.d.ts.map