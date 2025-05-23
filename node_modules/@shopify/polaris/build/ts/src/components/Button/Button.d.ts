import React from 'react';
import type { BaseButton, IconSource } from '../../types';
export interface ButtonProps extends BaseButton {
    /** The content to display inside the button */
    children?: string | string[];
    /**
     * Changes the size of the button, giving it more or less padding
     * @default 'medium'
     */
    size?: 'micro' | 'slim' | 'medium' | 'large';
    /** Changes the inner text alignment of the button */
    textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
    /** Allows the button to grow to the width of its container */
    fullWidth?: boolean;
    /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
    disclosure?: 'down' | 'up' | 'select' | boolean;
    /** Removes underline from button text (including on interaction)
     * @deprecated Use a variant instead
     */
    removeUnderline?: boolean;
    /** Icon to display to the left of the button content */
    icon?: React.ReactElement | IconSource;
    /** Indicates whether or not the button is the primary navigation link when rendered inside of an `IndexTable.Row` */
    dataPrimaryLink?: boolean;
    /** Sets the color treatment of the Button. */
    tone?: 'critical' | 'success';
    /** Changes the visual appearance of the Button. */
    variant?: 'plain' | 'primary' | 'secondary' | 'tertiary' | 'monochromePlain';
}
export declare function Button({ id, children, url, disabled, external, download, target, submit, loading, pressed, accessibilityLabel, role, ariaControls, ariaExpanded, ariaDescribedBy, ariaChecked, onClick, onFocus, onBlur, onKeyDown, onKeyPress, onKeyUp, onMouseEnter, onTouchStart, onPointerDown, icon, disclosure, removeUnderline, size, textAlign, fullWidth, dataPrimaryLink, tone, variant, }: ButtonProps): React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map