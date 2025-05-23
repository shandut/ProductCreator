import React from 'react';
import type { ComplexAction } from '../../../../types';
export interface LegacyCardSectionProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    subdued?: boolean;
    flush?: boolean;
    fullWidth?: boolean;
    /** Allow the card to be hidden when printing */
    hideOnPrint?: boolean;
    actions?: ComplexAction[];
}
export declare function Section({ children, title, subdued, flush, fullWidth, actions, hideOnPrint, }: LegacyCardSectionProps): React.JSX.Element;
//# sourceMappingURL=Section.d.ts.map