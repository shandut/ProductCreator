import React from 'react';
import type { IconProps } from '../../../../../Icon';
import type { ItemProps, SubNavigationItem } from '../../../../types';
export interface SecondaryNavigationProps {
    ItemComponent: React.ComponentType<ItemProps>;
    icon?: IconProps['source'];
    longestMatch: SubNavigationItem;
    subNavigationItems: SubNavigationItem[];
    showExpanded: boolean;
    truncateText?: boolean;
    secondaryNavigationId?: string;
}
export declare function SecondaryNavigation({ ItemComponent, icon, longestMatch, subNavigationItems, showExpanded, truncateText, secondaryNavigationId, }: SecondaryNavigationProps): React.JSX.Element;
//# sourceMappingURL=SecondaryNavigation.d.ts.map