import { createContext, useContext } from 'react';
type ClaimIdContextType = {
  claimId: string;
  setClaimId: (c: string) => void;
};
export const ClaimIdContext = createContext<ClaimIdContextType>({
  claimId: '',
  setClaimId: () => {},
});

export const useClaimContext = () => useContext(ClaimIdContext);
