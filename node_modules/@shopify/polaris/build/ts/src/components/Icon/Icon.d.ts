import React from 'react';
import type { IconSource } from '../../types';
type Tone = 'base' | 'inherit' | 'subdued' | 'caution' | 'warning' | 'critical' | 'interactive' | 'info' | 'success' | 'primary' | 'emphasis' | 'magic' | 'textCaution' | 'textWarning' | 'textCritical' | 'textInfo' | 'textSuccess' | 'textPrimary' | 'textMagic';
export interface IconProps {
    /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
    source: IconSource;
    /** Set the color for the SVG fill */
    tone?: Tone;
    /** Descriptive text to be read to screenreaders */
    accessibilityLabel?: string;
}
export declare function Icon({ source, tone, accessibilityLabel }: IconProps): React.JSX.Element;
export {};
//# sourceMappingURL=Icon.d.ts.map