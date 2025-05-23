import { useEffect, useLayoutEffect } from 'react';
import { isServer } from './target.js';

// eslint-disable-next-line no-restricted-imports
const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

export { useIsomorphicLayoutEffect };
