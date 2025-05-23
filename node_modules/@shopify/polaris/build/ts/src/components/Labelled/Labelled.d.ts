import React from 'react';
import type { Action, Error } from '../../types';
import { labelID } from '../Label';
import type { LabelProps } from '../Label';
export { labelID };
export interface LabelledProps {
    /** A unique identifier for the label */
    id: LabelProps['id'];
    /** Text for the label */
    label: React.ReactNode;
    /** Error to display beneath the label */
    error?: Error | boolean;
    /** An action */
    action?: Action;
    /** Additional hint text to display */
    helpText?: React.ReactNode;
    /** Content to display inside the connected */
    children?: React.ReactNode;
    /** Visually hide the label */
    labelHidden?: boolean;
    /** Visual required indicator for the label */
    requiredIndicator?: boolean;
    /** Labels signify a disabled control */
    disabled?: boolean;
    /** Labels signify a readOnly control */
    readOnly?: boolean;
}
export declare function Labelled({ id, label, error, action, helpText, children, labelHidden, requiredIndicator, disabled, readOnly, ...rest }: LabelledProps): React.JSX.Element;
export declare function errorID(id: string): string;
export declare function helpTextID(id: string): string;
//# sourceMappingURL=Labelled.d.ts.map