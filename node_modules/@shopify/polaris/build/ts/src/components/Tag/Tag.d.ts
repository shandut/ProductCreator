import React from 'react';
export interface NonMutuallyExclusiveProps {
    /** Content to display in the tag */
    children?: React.ReactNode;
    /** Disables the tag  */
    disabled?: boolean;
    /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
    onClick?(): void;
    /** Callback when remove button is clicked or keypressed. */
    onRemove?(): void;
    /** A string to use when tag has more than textual content */
    accessibilityLabel?: string;
    /** Url to navigate to when tag is clicked or keypressed. */
    url?: string;
    /** The size of the tag */
    size?: 'large';
}
export type TagProps = NonMutuallyExclusiveProps & ({
    onClick?(): void;
    onRemove?: undefined;
    url?: undefined;
} | {
    onClick?: undefined;
    onRemove?(): void;
    url?: string;
});
export declare function Tag({ children, disabled, onClick, onRemove, accessibilityLabel, url, size, }: TagProps): React.JSX.Element;
//# sourceMappingURL=Tag.d.ts.map