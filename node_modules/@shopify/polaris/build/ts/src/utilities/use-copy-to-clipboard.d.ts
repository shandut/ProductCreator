type Status = 'inactive' | 'copied' | 'failed';
interface UseCopyToClipboardOptions {
    defaultValue?: string;
    timeout?: number;
}
/**
 * Copy text to the native clipboard using the `navigator.clipboard` API
 * Adapted from https://www.benmvp.com/blog/copy-to-clipboard-react-custom-hook
 */
export declare function useCopyToClipboard(options?: UseCopyToClipboardOptions): readonly [(value?: string) => void, Status];
export {};
//# sourceMappingURL=use-copy-to-clipboard.d.ts.map