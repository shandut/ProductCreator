import React from 'react';
export interface CheckableButtonProps {
    accessibilityLabel?: string;
    label?: string;
    selected?: boolean | 'indeterminate';
    disabled?: boolean;
    onToggleAll?(): void;
    ariaLive?: 'off' | 'polite';
}
export declare const CheckableButton: React.ForwardRefExoticComponent<CheckableButtonProps & React.RefAttributes<unknown>>;
//# sourceMappingURL=CheckableButton.d.ts.map