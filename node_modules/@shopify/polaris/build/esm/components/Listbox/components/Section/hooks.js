import { useContext } from 'react';
import { SectionContext } from './context.js';

function useSection() {
  const context = useContext(SectionContext);
  return context;
}

export { useSection };
