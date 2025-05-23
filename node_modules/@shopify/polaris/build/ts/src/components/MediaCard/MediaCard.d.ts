import React from 'react';
import type { ActionListItemDescriptor, ComplexAction } from '../../types';
type Size = 'small' | 'medium';
interface MediaCardProps {
    /** The visual media to display in the card */
    children: React.ReactNode;
    /** Heading content */
    title: React.ReactNode;
    /** Body content */
    description: string;
    /** Main call to action, rendered as a basic button */
    primaryAction?: ComplexAction;
    /** Secondary call to action, rendered as a plain button */
    secondaryAction?: ComplexAction;
    /** Action list items to render in ellipsis popover */
    popoverActions?: ActionListItemDescriptor[];
    /** Whether or not card content should be laid out vertically
     * @default false
     */
    portrait?: boolean;
    /** Size of the visual media in the card
     * @default 'medium'
     */
    size?: Size;
    /** Callback when MediaCard is dismissed */
    onDismiss?: () => void;
}
export declare function MediaCard({ title, children, primaryAction, secondaryAction, description, popoverActions, portrait, size, onDismiss, }: MediaCardProps): React.JSX.Element;
export {};
//# sourceMappingURL=MediaCard.d.ts.map