import type { BadgeAction, DisableableAction, ActionListSection, MenuGroupDescriptor } from '../../types';
import type { BulkActionsProps } from './BulkActions';
type BulkActionListSection = ActionListSection;
export declare function getVisibleAndHiddenActionsIndices(promotedActions: any[] | undefined, disclosureWidth: number, actionsWidths: number[], containerWidth: number): {
    visiblePromotedActions: number[];
    hiddenPromotedActions: number[];
};
export declare function instanceOfBulkActionListSectionArray(actions: (BulkAction | BulkActionListSection)[]): actions is BulkActionListSection[];
export declare function instanceOfBulkActionArray(actions: (BulkAction | BulkActionListSection)[]): actions is BulkAction[];
export type BulkAction = DisableableAction & BadgeAction;
export declare function instanceOfMenuGroupDescriptor(action: MenuGroupDescriptor | BulkAction): action is MenuGroupDescriptor;
export declare function instanceOfBulkActionListSection(action: BulkAction | BulkActionListSection): action is BulkActionListSection;
export declare function getActionSections(actions: BulkActionsProps['actions']): BulkActionListSection[] | undefined;
export declare function isNewBadgeInBadgeActions(actionSections?: BulkActionListSection[]): boolean;
export {};
//# sourceMappingURL=utilities.d.ts.map