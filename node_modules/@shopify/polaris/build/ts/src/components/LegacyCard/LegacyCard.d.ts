import React from 'react';
import type { DisableableAction, ComplexAction } from '../../types';
import { Header, Section, Subsection } from './components';
export type { LegacyCardSectionProps, LegacyCardHeaderProps, LegacyCardSubsectionProps, } from './components';
export interface LegacyCardProps {
    /** Title content for the card */
    title?: React.ReactNode;
    /** Inner content of the card */
    children?: React.ReactNode;
    /** A less prominent card */
    subdued?: boolean;
    /** Auto wrap content in section */
    sectioned?: boolean;
    /** Card header actions */
    actions?: DisableableAction[];
    /** Primary action in the card footer */
    primaryFooterAction?: ComplexAction;
    /** Secondary actions in the card footer */
    secondaryFooterActions?: ComplexAction[];
    /** The content of the disclosure button rendered when there is more than one secondary footer action */
    secondaryFooterActionsDisclosureText?: string;
    /** Alignment of the footer actions on the card, defaults to right */
    footerActionAlignment?: 'right' | 'left';
    /** Allow the card to be hidden when printing */
    hideOnPrint?: boolean;
}
/** @deprecated Use the Card component instead */
export declare const LegacyCard: React.FunctionComponent<LegacyCardProps> & {
    Header: typeof Header;
    Section: typeof Section;
    Subsection: typeof Subsection;
};
//# sourceMappingURL=LegacyCard.d.ts.map