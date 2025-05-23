import React, { useRef, useMemo } from 'react';
import { useIsAfterInitialMount } from '../../utilities/use-is-after-initial-mount.js';
import { PortalsManagerContext } from '../../utilities/portals/context.js';
import { PortalsContainer } from './components/PortalsContainer/PortalsContainer.js';

function PortalsManager({
  children,
  container
}) {
  const isMounted = useIsAfterInitialMount();
  const ref = useRef(null);
  const contextValue = useMemo(() => {
    if (container) {
      return {
        container
      };
    } else if (isMounted) {
      return {
        container: ref.current
      };
    } else {
      return {
        container: null
      };
    }
  }, [container, isMounted]);
  return /*#__PURE__*/React.createElement(PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /*#__PURE__*/React.createElement(PortalsContainer, {
    ref: ref
  }));
}

export { PortalsManager };
