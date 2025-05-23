import React from 'react';
import type { ButtonProps } from '../../../Button';
interface SecondaryAction extends ButtonProps {
    helpText?: React.ReactNode;
    destructive?: boolean;
    onAction?(): void;
}
export declare function SecondaryAction({ children, tone, helpText, onAction, destructive, ...rest }: SecondaryAction): React.JSX.Element;
export {};
//# sourceMappingURL=SecondaryAction.d.ts.map