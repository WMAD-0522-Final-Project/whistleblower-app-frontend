import { createContext } from 'react';
type ClaimIdContextType = {
  claimId: string;
  setClaims: (c: string) => void;
};
export const ClaimIdContext = createContext<ClaimIdContextType>({
  claimId: '',
  setClaims: () => {},
});
