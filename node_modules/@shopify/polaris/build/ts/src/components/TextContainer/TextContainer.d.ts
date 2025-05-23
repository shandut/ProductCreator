import React from 'react';
type Spacing = 'tight' | 'loose';
export interface TextContainerProps {
    /** The amount of vertical spacing children will get between them */
    spacing?: Spacing;
    /** The content to render in the text container. */
    children?: React.ReactNode;
}
/** @deprecated Use BlockStack instead */
export declare function TextContainer({ spacing, children }: TextContainerProps): React.JSX.Element;
export {};
//# sourceMappingURL=TextContainer.d.ts.map