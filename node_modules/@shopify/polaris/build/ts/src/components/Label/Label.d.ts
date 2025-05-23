import React from 'react';
export interface LabelProps {
    /** Label content */
    children?: React.ReactNode;
    /** A unique identifier for the label */
    id: string;
    /** Visually hide the label */
    hidden?: boolean;
    /** Visual required indicator for the label */
    requiredIndicator?: boolean;
}
export declare function labelID(id: string): string;
export declare function Label({ children, id, hidden, requiredIndicator }: LabelProps): React.JSX.Element;
//# sourceMappingURL=Label.d.ts.map