import React from 'react';
import type { BorderRadiusAliasOrScale, SpaceScale } from '@shopify/polaris-tokens';
import type { TooltipOverlayProps } from './components';
export type Width = 'default' | 'wide';
export type Padding = 'default' | Extract<SpaceScale, '400'>;
export type BorderRadius = Extract<BorderRadiusAliasOrScale, '100' | '200'>;
export interface TooltipProps {
    /** The element that will activate to tooltip */
    children?: React.ReactNode;
    /** The content to display within the tooltip */
    content: React.ReactNode;
    /** Toggle whether the tooltip is visible */
    active?: boolean;
    /** Delay in milliseconds while hovering over an element before the tooltip is visible */
    hoverDelay?: number;
    /** Dismiss tooltip when not interacting with its children */
    dismissOnMouseOut?: TooltipOverlayProps['preventInteraction'];
    /**
     * The direction the tooltip tries to display
     * @default 'above'
     */
    preferredPosition?: TooltipOverlayProps['preferredPosition'];
    /**
     * The element type to wrap the activator in
     * @default 'span'
     */
    activatorWrapper?: string;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /**
     * Width of content
     * @default 'default'
     */
    width?: Width;
    /**
     * Padding of content
     * @default 'default'
     */
    padding?: Padding;
    /**
     * Border radius of the tooltip
     * @default '200'
     */
    borderRadius?: BorderRadius;
    /** Override on the default z-index of 400 */
    zIndexOverride?: number;
    /** Whether to render a dotted underline underneath the tooltip's activator */
    hasUnderline?: boolean;
    /** Whether the tooltip's content remains open after clicking the activator */
    persistOnClick?: boolean;
    onOpen?(): void;
    onClose?(): void;
}
export declare function Tooltip({ children, content, dismissOnMouseOut, active: originalActive, hoverDelay, preferredPosition, activatorWrapper, accessibilityLabel, width, padding, borderRadius: borderRadiusProp, zIndexOverride, hasUnderline, persistOnClick, onOpen, onClose, }: TooltipProps): React.JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map