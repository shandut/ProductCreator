import React from 'react';
import type { IconSource } from '../../types';
import type { Progress, Size, Tone } from './types';
interface NonMutuallyExclusiveProps {
    /** The content to display inside the badge. */
    children?: string;
    /** Colors and labels the badge with the given tone. */
    tone?: Tone;
    /** Render a pip showing the progress of a given task. */
    progress?: Progress;
    /** Icon to display to the left of the badge’s content. */
    icon?: IconSource;
    /**
     * @default 'medium'
     */
    size?: Size;
    /** Pass a custom accessibilityLabel */
    toneAndProgressLabelOverride?: string;
}
export type BadgeProps = NonMutuallyExclusiveProps & ({
    progress?: Progress;
    icon?: undefined;
} | {
    icon?: IconSource;
    progress?: undefined;
});
export declare function Badge({ children, tone, progress, icon, size, toneAndProgressLabelOverride, }: BadgeProps): React.JSX.Element;
export declare namespace Badge {
    var Pip: typeof import("./components").Pip;
}
export {};
//# sourceMappingURL=Badge.d.ts.map