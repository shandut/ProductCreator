import { createContext } from 'react';

const ListboxContext = /*#__PURE__*/createContext(undefined);
const WithinListboxContext = /*#__PURE__*/createContext(false);
const ActionContext = /*#__PURE__*/createContext(false);

export { ActionContext, ListboxContext, WithinListboxContext };
