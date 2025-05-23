import React from 'react';
import type { ReactNode } from 'react';
import type { MotionDurationScale } from '@shopify/polaris-tokens';
interface Transition {
    /** Expand the collpsible on render. */
    animateIn?: boolean;
    /** Assign a transition delay to the collapsible animation */
    delay?: MotionDurationScale;
    /** Assign a transition duration to the collapsible animation. */
    duration?: string;
    /** Assign a transition timing function to the collapsible animation */
    timingFunction?: string;
}
export interface CollapsibleProps {
    /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
    id: string;
    /** Option to show collapsible content when printing */
    expandOnPrint?: boolean;
    /** Toggle whether the collapsible is expanded or not. */
    open: boolean;
    /** The direction the collapsible collapses in.
     * @default 'block'
     */
    variant?: 'block' | 'inline';
    /** Override transition properties. When set to false, disables transition completely.
     * @default transition={{duration: 'var(--p-motion-duration-150)', timingFunction: 'var(--p-motion-ease-in-out)'}}
     */
    transition?: boolean | Transition;
    /** Callback when the animation completes. */
    onAnimationEnd?(): void;
    /** The content to display inside the collapsible. */
    children?: ReactNode;
}
export declare function Collapsible({ id, expandOnPrint, open, variant, transition, children, onAnimationEnd, }: CollapsibleProps): React.JSX.Element;
export {};
//# sourceMappingURL=Collapsible.d.ts.map