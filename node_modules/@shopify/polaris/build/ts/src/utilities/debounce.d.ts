interface DebounceSettings {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}
export declare function debounce<T extends (this: unknown, ...args: any[]) => any>(func: T, waitArg?: number, options?: DebounceSettings): {
    (this: unknown, ...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export {};
//# sourceMappingURL=debounce.d.ts.map