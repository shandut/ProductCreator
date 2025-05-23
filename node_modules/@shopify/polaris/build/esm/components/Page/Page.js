import React from 'react';
import { classNames } from '../../utilities/css.js';
import { isInterface } from '../../utilities/is-interface.js';
import { isReactElement } from '../../utilities/is-react-element.js';
import styles from './Page.css.js';
import { Header } from './components/Header/Header.js';

function Page({
  children,
  fullWidth,
  narrowWidth,
  ...rest
}) {
  const pageClassName = classNames(styles.Page, fullWidth && styles.fullWidth, narrowWidth && styles.narrowWidth);
  const hasHeaderContent = rest.title != null && rest.title !== '' || rest.subtitle != null && rest.subtitle !== '' || rest.primaryAction != null || rest.secondaryActions != null && (isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null;
  const contentClassName = classNames(!hasHeaderContent && styles.Content);
  const headerMarkup = hasHeaderContent ? /*#__PURE__*/React.createElement(Header, Object.assign({
    filterActions: true
  }, rest)) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: pageClassName
  }, headerMarkup, /*#__PURE__*/React.createElement("div", {
    className: contentClassName
  }, children));
}

export { Page };
