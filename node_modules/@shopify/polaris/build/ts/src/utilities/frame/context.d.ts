/// <reference types="react" />
import type { ToastPropsWithID, ToastID, ContextualSaveBarProps, Logo } from './types';
export interface FrameContextType {
    logo?: Logo;
    showToast(toast: ToastPropsWithID): void;
    hideToast(toast: ToastID): void;
    toastMessages: ToastPropsWithID[];
    setContextualSaveBar(props: ContextualSaveBarProps): void;
    removeContextualSaveBar(): void;
    contextualSaveBarVisible: boolean;
    contextualSaveBarProps: ContextualSaveBarProps | null;
    startLoading(): void;
    stopLoading(): void;
}
export declare const FrameContext: import("react").Context<FrameContextType | undefined>;
//# sourceMappingURL=context.d.ts.map