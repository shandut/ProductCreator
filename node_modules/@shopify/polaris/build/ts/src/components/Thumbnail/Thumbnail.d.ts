import React from 'react';
type Size = 'extraSmall' | 'small' | 'medium' | 'large';
export interface ThumbnailProps {
    /**
     * Size of thumbnail
     * @default 'medium'
     */
    size?: Size;
    /** URL for the image */
    source: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    /** Alt text for the thumbnail image */
    alt: string;
    /** Transparent background */
    transparent?: boolean;
}
export declare function Thumbnail({ source, alt, size, transparent, }: ThumbnailProps): React.JSX.Element;
export {};
//# sourceMappingURL=Thumbnail.d.ts.map