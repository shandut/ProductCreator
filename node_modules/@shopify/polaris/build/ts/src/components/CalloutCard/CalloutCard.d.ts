import React from 'react';
import type { IconableAction } from '../../types';
import type { ButtonProps } from '../Button';
export interface CalloutCardProps {
    /** The content to display inside the callout card. */
    children?: React.ReactNode;
    /** The title of the card */
    title: React.ReactNode;
    /** URL to the card illustration */
    illustration: string;
    /** Primary action for the card */
    primaryAction: IconableAction;
    /** Secondary action for the card */
    secondaryAction?: IconableAction & Pick<ButtonProps, 'variant'>;
    /** Callback when banner is dismissed */
    onDismiss?(): void;
}
export declare function CalloutCard({ title, children, illustration, primaryAction, secondaryAction, onDismiss, }: CalloutCardProps): React.JSX.Element;
//# sourceMappingURL=CalloutCard.d.ts.map