import type { Key } from '../../types';
export interface NonMutuallyExclusiveProps {
    keyCode: Key;
    handler(event: KeyboardEvent): void;
    keyEvent?: KeyEvent;
    document?: Document;
}
export type KeypressListenerProps = NonMutuallyExclusiveProps & ({
    useCapture?: boolean;
    options?: undefined;
} | {
    useCapture?: undefined;
    options?: AddEventListenerOptions;
});
type KeyEvent = 'keydown' | 'keyup';
export declare function KeypressListener({ keyCode, handler, keyEvent, options, useCapture, document: ownerDocument, }: KeypressListenerProps): null;
export {};
//# sourceMappingURL=KeypressListener.d.ts.map