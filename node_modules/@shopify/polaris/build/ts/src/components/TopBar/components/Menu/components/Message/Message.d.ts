import React from 'react';
import type { BadgeProps } from '../../../../../Badge';
export interface MessageProps {
    title: string;
    description: string;
    action: {
        onClick(): void;
        content: string;
    };
    link: {
        to: string;
        content: string;
    };
    badge?: {
        content: string;
        tone: BadgeProps['tone'];
    };
}
export declare function Message({ title, description, action, link, badge, }: MessageProps): React.JSX.Element;
//# sourceMappingURL=Message.d.ts.map