import React from 'react';
import type { PositionedOverlayProps } from '../../../PositionedOverlay';
import type { Width, Padding, BorderRadius } from '../../Tooltip';
export interface TooltipOverlayProps {
    id: string;
    active: boolean;
    preventInteraction?: PositionedOverlayProps['preventInteraction'];
    preferredPosition?: PositionedOverlayProps['preferredPosition'];
    children?: React.ReactNode;
    activator: HTMLElement;
    accessibilityLabel?: string;
    width?: Width;
    padding?: Padding;
    borderRadius?: BorderRadius;
    zIndexOverride?: number;
    onClose(): void;
    instant?: boolean;
}
export declare function TooltipOverlay({ active, activator, preferredPosition, preventInteraction, id, children, accessibilityLabel, width, padding, borderRadius, zIndexOverride, instant, }: TooltipOverlayProps): React.JSX.Element | null;
//# sourceMappingURL=TooltipOverlay.d.ts.map