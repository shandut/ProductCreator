import React from 'react';
import type { ListboxProps, OptionProps } from '../Listbox';
import type { IconProps } from '../Icon';
import type { SearchFieldProps, ActivatorProps } from './components';
export interface PickerProps extends Omit<ListboxProps, 'children'> {
    /** Configure the button that activates the Picker */
    activator: ActivatorProps;
    /** Allows more than one option to be selected */
    allowMultiple?: boolean;
    /** The options to be listed within the picker */
    options?: OptionProps[];
    /** Used to add a new picker option that isn't listed */
    addAction?: OptionProps & {
        icon?: IconProps['source'];
    };
    /** TextField that allows filtering of options */
    searchField?: SearchFieldProps;
    /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
    willLoadMoreOptions?: boolean;
    /** Height to set on the Popover Pane. */
    height?: string;
    /** Callback fired when the bottom of the listbox is reached. Use to lazy load when listbox option data is paginated. */
    onScrolledToBottom?(): void;
    /** Callback fired when the popover closes */
    onClose?(): void;
}
export declare function Picker({ activator, allowMultiple, searchField, options, willLoadMoreOptions, height, addAction, onScrolledToBottom, onClose, ...listboxProps }: PickerProps): React.JSX.Element;
//# sourceMappingURL=Picker.d.ts.map