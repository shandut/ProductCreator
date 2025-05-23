import React from 'react';
type Size = 'small' | 'medium' | 'large';
type Tone = 'highlight' | 'primary' | 'success' | 'critical';
export interface ProgressBarProps {
    /**
     * The progression of certain tasks
     * @default 0
     */
    progress?: number;
    /**
     * Size of progressbar
     * @default 'medium'
     */
    size?: Size;
    /**
     * Whether the fill animation is triggered
     * @default 'true'
     */
    animated?: boolean;
    /**
     * Id (ids) of element (elements) that describes progressbar
     */
    ariaLabelledBy?: string;
    /**
     * Color of progressbar
     * @default 'highlight'
     */
    tone?: Tone;
}
export declare function ProgressBar({ progress, size, tone, animated: hasAppearAnimation, ariaLabelledBy, }: ProgressBarProps): React.JSX.Element;
export {};
//# sourceMappingURL=ProgressBar.d.ts.map