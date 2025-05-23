import React from 'react';
import type { SpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '../../utilities/css';
type Spacing = ResponsiveProp<SpaceScale>;
export interface BleedProps extends React.AriaAttributes {
    children?: React.ReactNode;
    /** Negative horizontal space around children */
    marginInline?: Spacing;
    /** Negative vertical space around children */
    marginBlock?: Spacing;
    /** Negative top space around children */
    marginBlockStart?: Spacing;
    /** Negative bottom space around children */
    marginBlockEnd?: Spacing;
    /** Negative left space around children */
    marginInlineStart?: Spacing;
    /** Negative right space around children */
    marginInlineEnd?: Spacing;
}
export declare const Bleed: ({ marginInline, marginBlock, marginBlockStart, marginBlockEnd, marginInlineStart, marginInlineEnd, children, }: BleedProps) => React.JSX.Element;
export {};
//# sourceMappingURL=Bleed.d.ts.map