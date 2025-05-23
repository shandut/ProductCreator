/// <reference types="react" />
interface MappedActionContextType {
    role?: string;
    url?: string;
    external?: boolean;
    onAction?(): void;
    destructive?: boolean;
}
export declare const MappedActionContext: import("react").Context<MappedActionContextType>;
export {};
//# sourceMappingURL=context.d.ts.map