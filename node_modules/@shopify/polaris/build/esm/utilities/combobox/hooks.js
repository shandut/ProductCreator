import { useContext } from 'react';
import { ComboboxListboxContext, ComboboxTextFieldContext } from './context.js';

function useComboboxTextField() {
  const context = useContext(ComboboxTextFieldContext);
  if (!context) {
    throw new Error('No Combobox was provided. Your component must be wrapped in a <Combobox> component.');
  }
  return context;
}
function useComboboxListbox() {
  const context = useContext(ComboboxListboxContext);
  return context;
}

export { useComboboxListbox, useComboboxTextField };
