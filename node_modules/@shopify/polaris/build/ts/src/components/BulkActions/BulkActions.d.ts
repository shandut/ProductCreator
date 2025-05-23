import React from 'react';
import type { BadgeAction, DisableableAction, ActionListSection, MenuGroupDescriptor, Action } from '../../types';
import type { ButtonProps } from '../Button';
export type BulkAction = DisableableAction & BadgeAction;
type BulkActionListSection = ActionListSection;
export interface BulkActionsProps {
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** State of the bulk actions checkbox */
    selected?: boolean | 'indeterminate';
    /** Text to select all across pages */
    paginatedSelectAllText?: string;
    /** Action for selecting all across pages */
    paginatedSelectAllAction?: Action;
    /** Callback when the select all checkbox is clicked */
    onToggleAll?(): void;
    /** Actions that will be given more prominence */
    promotedActions?: (BulkAction | MenuGroupDescriptor)[];
    /** List of actions */
    actions?: (BulkAction | BulkActionListSection)[];
    /** Disables bulk actions */
    disabled?: boolean;
    /** Callback when more actions button is toggled */
    onMoreActionPopoverToggle?(isOpen: boolean): void;
    /** The size of the buttons to render */
    buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
    /** Label for the bulk actions */
    label?: string;
    /** List is in a selectable state. Will only render the bulk actions when `true` */
    selectMode?: boolean;
    /** @deprecated Used for forwarding the ref. Use `ref` prop instead */
    innerRef?: React.Ref<any>;
    /** @deprecated Callback when selectable state of list is changed. Unused callback */
    onSelectModeToggle?(selectMode: boolean): void;
    /** @deprecated If the BulkActions is currently sticky in view */
    isSticky?: boolean;
    /** @deprecated The width of the BulkActions */
    width?: number;
}
export declare const BulkActions: React.ForwardRefExoticComponent<BulkActionsProps & React.RefAttributes<unknown>>;
export {};
//# sourceMappingURL=BulkActions.d.ts.map