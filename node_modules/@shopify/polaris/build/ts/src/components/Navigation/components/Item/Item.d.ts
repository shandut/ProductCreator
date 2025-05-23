import React from 'react';
import type { ItemProps, SecondaryAction } from '../../types';
export declare const MAX_SECONDARY_ACTIONS = 2;
export declare function Item({ url, icon: baseIcon, matchedItemIcon, label, subNavigationItems, secondaryAction, secondaryActions, displayActionsOnHover, disabled, onClick, accessibilityLabel, selected: selectedOverride, badge, new: isNew, matches, exactMatch, matchPaths, excludePaths, external, onToggleExpandedState, expanded, shouldResizeIcon, truncateText, showVerticalLine, showVerticalHoverPointer, level, onMouseEnter, onMouseLeave, }: ItemProps): React.JSX.Element;
interface ItemSecondaryActionProps extends SecondaryAction {
    tabIndex: number;
    disabled?: boolean;
}
export declare function ItemSecondaryAction({ url, icon, accessibilityLabel, tooltip, onClick, disabled, tabIndex, }: ItemSecondaryActionProps): React.JSX.Element;
export declare function isNavigationItemActive(navigationItem: ItemProps, currentPath: string): boolean | undefined;
export {};
//# sourceMappingURL=Item.d.ts.map