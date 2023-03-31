import { createContext, useContext } from 'react';
type ClaimIdContextType = {
  claimId: string | null;
  setClaimId: (c: string | null) => void;
};
export const ClaimIdContext = createContext<ClaimIdContextType>({
  claimId: null,
  setClaimId: () => {},
});

export const useClaimContext = () => useContext(ClaimIdContext);
