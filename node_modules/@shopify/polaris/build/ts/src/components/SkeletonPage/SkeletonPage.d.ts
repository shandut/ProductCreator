import React from 'react';
export interface SkeletonPageProps {
    /** Page title, in large type */
    title?: string;
    /** Remove the normal max-width on the page */
    fullWidth?: boolean;
    /** Decreases the maximum layout width. Intended for single-column layouts */
    narrowWidth?: boolean;
    /** Shows a skeleton over the primary action */
    primaryAction?: boolean;
    /** Shows a skeleton over the backAction */
    backAction?: boolean;
    /** The child elements to render in the skeleton page. */
    children?: React.ReactNode;
}
export declare function SkeletonPage({ children, fullWidth, narrowWidth, primaryAction, title, backAction, }: SkeletonPageProps): React.JSX.Element;
//# sourceMappingURL=SkeletonPage.d.ts.map