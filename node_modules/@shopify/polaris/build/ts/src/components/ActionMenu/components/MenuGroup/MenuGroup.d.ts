import React from 'react';
import type { ActionListSection, MenuGroupDescriptor } from '../../../../types';
export interface MenuGroupProps extends MenuGroupDescriptor {
    /** Visually hidden menu description for screen readers */
    accessibilityLabel?: string;
    /** Whether or not the menu is open */
    active?: boolean;
    /** Callback when the menu is clicked */
    onClick?(openActions: () => void): void;
    /** Callback for opening the MenuGroup by title */
    onOpen(title: string): void;
    /** Callback for closing the MenuGroup by title */
    onClose(title: string): void;
    /** Collection of sectioned action items */
    sections?: readonly ActionListSection[];
}
export declare function MenuGroup({ accessibilityLabel, active, actions, details, title, icon, disabled, onClick, onClose, onOpen, sections, }: MenuGroupProps): React.JSX.Element;
//# sourceMappingURL=MenuGroup.d.ts.map