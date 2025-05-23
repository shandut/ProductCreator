import React from 'react';
import type { Ref } from 'react';
interface SourceSet {
    source: string;
    descriptor?: string;
}
type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    alt: string;
    source: string;
    crossOrigin?: CrossOrigin;
    sourceSet?: SourceSet[];
    onLoad?(): void;
    onError?(): void;
    ref?: Ref<HTMLImageElement>;
}
export declare const Image: React.ForwardRefExoticComponent<Omit<ImageProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
export {};
//# sourceMappingURL=Image.d.ts.map