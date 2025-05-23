import React from 'react';
import type { BaseButton } from '../../types';
export interface UnstyledButtonProps extends BaseButton {
    /** The content to display inside the button */
    children?: React.ReactNode;
    /** A custom class name to apply styles to button */
    className?: string;
    [key: string]: any;
}
export declare function UnstyledButton({ id, children, className, url, external, target, download, submit, disabled, loading, pressed, accessibilityLabel, role, ariaControls, ariaExpanded, ariaDescribedBy, ariaChecked, onClick, onFocus, onBlur, onKeyDown, onKeyPress, onKeyUp, onMouseEnter, onTouchStart, ...rest }: UnstyledButtonProps): React.JSX.Element;
//# sourceMappingURL=UnstyledButton.d.ts.map