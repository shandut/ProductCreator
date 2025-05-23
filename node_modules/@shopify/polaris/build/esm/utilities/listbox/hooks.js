import { useContext } from 'react';
import { ListboxContext } from './context.js';

function useListbox() {
  const listbox = useContext(ListboxContext);
  if (!listbox) {
    throw new Error('No Listbox was provided. Listbox components must be wrapped in a Listbox');
  }
  return listbox;
}

export { useListbox };
