import { createContext, useContext } from 'react';
import { ContextType } from '../types';
type ClaimIdContextType = {
  context: ContextType | null;
  setContext: (c: ContextType | null) => void;
};
export const ClaimIdContext = createContext<ClaimIdContextType>({
  context: null,
  setContext: () => {},
});

export const useClaimContext = () => useContext(ClaimIdContext);
