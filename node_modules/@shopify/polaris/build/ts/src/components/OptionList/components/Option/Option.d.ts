import React from 'react';
import type { IconProps } from '../../../Icon';
import type { ThumbnailProps } from '../../../Thumbnail';
import type { AvatarProps } from '../../../Avatar';
type Alignment = 'top' | 'center' | 'bottom';
export interface OptionProps {
    id: string;
    label: React.ReactNode;
    value: string;
    section: number;
    index: number;
    media?: React.ReactElement<IconProps | AvatarProps | ThumbnailProps>;
    disabled?: boolean;
    active?: boolean;
    select?: boolean;
    allowMultiple?: boolean;
    verticalAlign?: Alignment;
    onClick(section: number, option: number): void;
    /** Callback when pointer enters the option */
    onPointerEnter(section: number, option: number): void;
    /** Callback when option is focused */
    onFocus(section: number, option: number): void;
}
export declare function Option({ label, value, id, select, active, allowMultiple, disabled, media, onClick, section, index, verticalAlign, onPointerEnter, onFocus, }: OptionProps): React.JSX.Element;
export {};
//# sourceMappingURL=Option.d.ts.map