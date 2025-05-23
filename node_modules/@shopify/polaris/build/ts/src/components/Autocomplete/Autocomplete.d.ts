import React from 'react';
import type { ActionListItemDescriptor, OptionDescriptor, SectionDescriptor } from '../../types';
import type { PopoverProps } from '../Popover';
import { Combobox } from '../Combobox';
export interface AutocompleteProps {
    /** A unique identifier for the Autocomplete */
    id?: string;
    /** Collection of options to be listed */
    options: SectionDescriptor[] | OptionDescriptor[];
    /** The selected options */
    selected: string[];
    /** The text field component attached to the list of options */
    textField: React.ReactElement;
    /** The preferred direction to open the popover */
    preferredPosition?: PopoverProps['preferredPosition'];
    /** Title of the list of options */
    listTitle?: string;
    /** Allow more than one option to be selected */
    allowMultiple?: boolean;
    /** An action to render above the list of options */
    actionBefore?: ActionListItemDescriptor & {
        /** Specifies that if the label is too long it will wrap instead of being hidden  */
        wrapOverflow?: boolean;
    };
    /** Display loading state */
    loading?: boolean;
    /** Indicates if more results will load dynamically */
    willLoadMoreResults?: boolean;
    /** Is rendered when there are no options */
    emptyState?: React.ReactNode;
    /** Callback when the selection of options is changed */
    onSelect(selected: string[]): void;
    /** Callback when the end of the list is reached */
    onLoadMoreResults?(): void;
}
export declare const Autocomplete: React.FunctionComponent<AutocompleteProps> & {
    TextField: typeof Combobox.TextField;
};
//# sourceMappingURL=Autocomplete.d.ts.map