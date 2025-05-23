import { useEffect } from 'react';
import './ScrollLock.css.js';
import { useScrollLockManager } from '../../utilities/scroll-lock-manager/hooks.js';

// Even though this has no args, reference ScrollLockProps so the prop explorer
// in the styleguide works without warnings about unfound props
function ScrollLock(_) {
  const scrollLockManager = useScrollLockManager();
  useEffect(() => {
    scrollLockManager.registerScrollLock();
    return () => {
      scrollLockManager.unregisterScrollLock();
    };
  }, [scrollLockManager]);
  return null;
}

export { ScrollLock };
