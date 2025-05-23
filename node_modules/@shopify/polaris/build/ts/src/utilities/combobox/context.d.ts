/// <reference types="react" />
export interface ComboboxTextFieldType {
    activeOptionId?: string;
    listboxId?: string;
    expanded?: boolean;
    setTextFieldLabelId?(id: string): void;
    setTextFieldFocused?(value: boolean): void;
    onTextFieldFocus?(): void;
    onTextFieldBlur?(): void;
    onTextFieldChange?(value: string): void;
}
export interface ComboboxListboxType {
    textFieldLabelId?: string;
    textFieldFocused?: boolean;
    listboxId?: string;
    willLoadMoreOptions?: boolean;
    setActiveOptionId?(id: string): void;
    setListboxId?(id: string): void;
    onOptionSelected?(): void;
    onKeyToBottom?(): void;
}
export interface ComboboxListboxOptionType {
    allowMultiple?: boolean;
}
export declare const ComboboxTextFieldContext: import("react").Context<ComboboxTextFieldType | undefined>;
export declare const ComboboxListboxContext: import("react").Context<ComboboxListboxType>;
export declare const ComboboxListboxOptionContext: import("react").Context<ComboboxListboxOptionType>;
//# sourceMappingURL=context.d.ts.map