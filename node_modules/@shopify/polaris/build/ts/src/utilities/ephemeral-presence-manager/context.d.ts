/// <reference types="react" />
export type EphemeralPresenceKey = 'tooltip';
export interface EphemeralPresenceManagerContextType {
    presenceList: {
        [key in EphemeralPresenceKey]: boolean;
    };
    presenceCounter: {
        [key in EphemeralPresenceKey]: number;
    };
    addPresence: (key: EphemeralPresenceKey) => void;
    removePresence: (key: EphemeralPresenceKey) => void;
}
export declare const EphemeralPresenceManagerContext: import("react").Context<EphemeralPresenceManagerContextType | undefined>;
//# sourceMappingURL=context.d.ts.map