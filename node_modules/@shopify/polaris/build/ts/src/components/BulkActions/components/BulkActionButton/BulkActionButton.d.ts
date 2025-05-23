import React from 'react';
import type { DestructableAction, DisableableAction } from '../../../../types';
import type { ButtonProps } from '../../../Button';
export type BulkActionButtonProps = {
    disclosure?: boolean;
    indicator?: boolean;
    handleMeasurement?(width: number): void;
    showContentInButton?: boolean;
    size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
} & DisableableAction & DestructableAction;
export declare function BulkActionButton({ handleMeasurement, url, external, onAction, content, disclosure, accessibilityLabel, disabled, destructive, indicator, showContentInButton, size, }: BulkActionButtonProps): React.JSX.Element;
//# sourceMappingURL=BulkActionButton.d.ts.map