import React from 'react';
import type { ReactNode } from 'react';
export declare enum AutoSelection {
    /** Default active option is the first selected option. If no options are selected, defaults to first interactive option. */
    FirstSelected = "FIRST_SELECTED",
    /** Default active option is always the first interactive option. */
    First = "FIRST",
    /** Default to the manual selection pattern. */
    None = "NONE"
}
export interface ListboxProps {
    /** Inner content of the listbox */
    children: ReactNode;
    /** Indicates the default active option in the list. Patterns that support option creation should default the active option to the first option.
     * @default AutoSelection.FirstSelected
     */
    autoSelection?: AutoSelection;
    /** Explicitly enable keyboard control */
    enableKeyboardControl?: boolean;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Provide a custom ID for the list element */
    customListId?: string;
    /** Callback fired when an option is selected */
    onSelect?(value: string): void;
    /** Callback fired when an option becomes active */
    onActiveOptionChange?(value: string, domId: string): void;
}
export type ArrowKeys = 'up' | 'down';
export declare function Listbox({ children, autoSelection, enableKeyboardControl, accessibilityLabel, customListId, onSelect, onActiveOptionChange, }: ListboxProps): React.JSX.Element;
export declare namespace Listbox {
    var Option: React.NamedExoticComponent<import("./components").OptionProps>;
    var TextOption: React.NamedExoticComponent<import("./components/TextOption/TextOption").TextOptionProps>;
    var Loading: React.NamedExoticComponent<import("./components/Loading/Loading").LoadingProps>;
    var Section: typeof import("./components").Section;
    var Header: typeof import("./components").Header;
    var Action: typeof import("./components").Action;
}
//# sourceMappingURL=Listbox.d.ts.map