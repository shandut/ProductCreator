import React from 'react';
import type { BorderWidthScale, ColorBorderAlias } from '@shopify/polaris-tokens';
export interface DividerProps {
    /**
     * Divider border color
     * @default 'border-secondary'
     */
    borderColor?: ColorBorderAlias | 'transparent';
    /**
     * Divider border width
     * @default '025'
     */
    borderWidth?: BorderWidthScale;
}
export declare const Divider: ({ borderColor, borderWidth, }: DividerProps) => React.JSX.Element;
//# sourceMappingURL=Divider.d.ts.map