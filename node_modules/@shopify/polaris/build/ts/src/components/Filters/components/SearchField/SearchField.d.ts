import React from 'react';
export interface SearchFieldProps {
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onClear?: () => void;
    focused?: boolean;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    borderlessQueryField?: boolean;
    /** Show a loading spinner to the right of the input */
    loading?: boolean;
    /** @deprecated If present, will show as a suffix in the text field when entering a search term */
    selectedViewName?: string;
}
export declare function SearchField({ onChange, onClear, onFocus, onBlur, focused, value, placeholder, disabled, borderlessQueryField, loading, selectedViewName, }: SearchFieldProps): React.JSX.Element;
//# sourceMappingURL=SearchField.d.ts.map