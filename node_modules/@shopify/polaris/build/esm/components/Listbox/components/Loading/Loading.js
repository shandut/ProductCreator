import React, { memo, useEffect } from 'react';
import styles from './Loading.css.js';
import { useListbox } from '../../../../utilities/listbox/hooks.js';
import { Spinner } from '../../../Spinner/Spinner.js';

const Loading = /*#__PURE__*/memo(function LoadingOption({
  children,
  accessibilityLabel: label
}) {
  const {
    setLoading
  } = useListbox();
  useEffect(() => {
    setLoading(label);
    return () => {
      setLoading(undefined);
    };
  }, [label, setLoading]);
  return /*#__PURE__*/React.createElement("li", {
    className: styles.ListItem,
    role: "presentation"
  }, children ? children : /*#__PURE__*/React.createElement("div", {
    className: styles.Loading
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: "small",
    accessibilityLabel: label
  })));
});

export { Loading };
