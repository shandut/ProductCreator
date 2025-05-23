import React from 'react';
import type { BorderRadiusAliasOrScale, ShadowAliasOrScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '../../utilities/css';
export interface ShadowBevelProps {
    as?: React.ElementType;
    children?: React.ReactNode;
    /** The box-shadow applied to the root element. */
    boxShadow: ShadowAliasOrScale;
    /** The border-radius applied to both the root and pseudo elements. */
    borderRadius: BorderRadiusAliasOrScale;
    /** The z-index applied to the pseudo element. */
    zIndex?: string;
    /**
     * Enable/disable the bevel effect.
     * Note: This also disables the border-radius and box-shadow.
     * @default true
     */
    bevel?: ResponsiveProp<boolean>;
}
export declare function ShadowBevel(props: ShadowBevelProps): React.JSX.Element;
//# sourceMappingURL=ShadowBevel.d.ts.map