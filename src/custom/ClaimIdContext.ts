import { createContext, useContext } from 'react';
import { ContextType } from '../types';
type ClaimIdContextType = {
  context: ContextType;
  setContext: (c: ContextType) => void;
};
export const CreateContext = createContext<ClaimIdContextType>({
  context: { claimsId: '', userId: '' },
  setContext: () => {},
});

export const useAllContext = () => useContext(CreateContext);
