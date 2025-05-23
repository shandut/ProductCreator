import React from 'react';
type Size = 'small' | 'medium' | 'large' | 'extraLarge';
export interface SkeletonDisplayTextProps {
    /**
     * Size of the text
     * @default 'medium'
     */
    size?: Size;
    /**
     * Maxium width of the text
     * @default '120px'
     */
    maxWidth?: `${number}ch` | `${number}%`;
}
export declare function SkeletonDisplayText({ size, maxWidth, }: SkeletonDisplayTextProps): React.JSX.Element;
export {};
//# sourceMappingURL=SkeletonDisplayText.d.ts.map