import React from 'react';
import type { PopoverProps } from '../Popover';
import type { TextFieldProps } from '../TextField';
import type { ListboxProps } from '../Listbox';
export interface ComboboxProps {
    /** The text field component to activate the Popover */
    activator: React.ReactElement<TextFieldProps>;
    /** Allows more than one option to be selected */
    allowMultiple?: boolean;
    /** The content to display inside the popover */
    children?: React.ReactElement<ListboxProps> | null;
    /** The preferred direction to open the popover */
    preferredPosition?: PopoverProps['preferredPosition'];
    /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
    willLoadMoreOptions?: boolean;
    /** Height to set on the Popover Pane. */
    height?: string;
    /** Callback fired when the bottom of the listbox is reached. Use to lazy load when listbox option data is paginated. */
    maxHeight?: string;
    /** Min Height to set on the Popover Pane. */
    minHeight?: string;
    /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
    onScrolledToBottom?(): void;
    /** Callback fired when the popover closes */
    onClose?(): void;
}
export declare function Combobox({ activator, allowMultiple, children, preferredPosition, willLoadMoreOptions, height, maxHeight, minHeight, onScrolledToBottom, onClose, }: ComboboxProps): React.JSX.Element;
export declare namespace Combobox {
    var TextField: typeof import("./components").TextField;
}
//# sourceMappingURL=Combobox.d.ts.map